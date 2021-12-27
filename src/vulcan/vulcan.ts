import * as initialization from "./initialization";
import * as helpers from "../helpers";
import * as vulcanHelpers from "./helpers";
import * as consts from "../consts";
import * as deviceHelper from "../deviceHelper";

export class RoccatVulcan {
    private readonly ledDevice;
    private grid: { KEYGRID: (number[])[] }; //array of arrays
    private keyList: any;
    private keyBuffer: any;
    private alphabet: any;
    private animateTimers: any[];
    private animationQueue: any[];
    private animationQueueCurrent: number;
    private currentColors: { r: number, g: number, b: number }[];
    private autoRender: NodeJS.Timer;

    constructor(options: { productId?: number, onData?: Function, ready?: Function, layout?: string }) {
        options = options ? options : {productId: null, onData: null, ready: null, layout: null};

        //Import Keyboard layout
        const layout = 'layout' in options ? options.layout : 'ch-de';
        import(`./keyboardlayout/${layout}/grid.js`).then(grid => this.grid = grid);
        import(`./keyboardlayout/${layout}/keys.js`).then(keyList => this.keyList = keyList);
        import(`./keyboardlayout/${layout}/keybuffer.js`).then(keyBuffer => this.keyBuffer = keyBuffer);
        import(`./keyboardlayout/${layout}/alphabet.js`).then(alphabet => this.alphabet = alphabet);

        console.log("Initialize Vulcan")

        this.animateTimers = [];
        this.animationQueue = [];
        this.currentColors = vulcanHelpers.getKeys(helpers.hexToRgb('#000000'));

        if (options.productId) {
            this.ledDevice = deviceHelper.getLedDevice('vulcan', options.productId)
        } else {
            this.ledDevice = deviceHelper.getLedDevice('vulcan')
        }

        // initializing reading device
        let ctrlDevice;
        if (options.productId) {
            ctrlDevice = deviceHelper.getCtrlDevice('vulcan', options.productId)
        } else {
            ctrlDevice = deviceHelper.getCtrlDevice('vulcan', null)
        }

        if (options.onData) {
            try {
                let key = 0;
                ctrlDevice.on("data", d => {
                    switch (d[2]) {
                        case 10:
                            key = this.keyBuffer.KEYREADBUFFER10[d[3]];
                            break;
                        case 204:
                            key = this.keyBuffer.KEYREADBUFFER204[d[3]];
                            break;
                        case 251:
                            key = this.keyBuffer.KEYREADBUFFER251[d[3]];
                            break;
                    }
                    options.onData({key: key, state: d[4]})
                })
                ctrlDevice.close()
            } catch (e) {
                console.log("Could not register onData-Event. Keyboard does not react. Change usePage in Code. Sorry")
                console.log(e)
            }
        }

        // initializing writing device
        if (options.productId) {
            ctrlDevice = deviceHelper.getCtrlDevice('vulcan', options.productId, true)
        } else {
            ctrlDevice = deviceHelper.getCtrlDevice('vulcan', null, true)
        }

        //Start Keyboard initialisation
        initialization.run(ctrlDevice)
            .then(() => {
                //Initialisation done. Close Ctrl Device
                ctrlDevice.close()

                console.log("Vulcan is ready")
                if (options.ready) {
                    helpers.sleep().then(() => options.ready());
                }
            })
    }

    get currentColor() {
        return this.currentColors;
    }

    set currentColor(val) {
        this.currentColors = val;
    }

    getGrid() {
        return this.grid.KEYGRID;
    }

    fillAll(color: string | { r: number, g: number, b: number }) {
        if (typeof color === 'string') {
            this.currentColors = vulcanHelpers.getKeys(helpers.hexToRgb(color));
        } else {
            this.currentColors = vulcanHelpers.getKeys(color);
        }
    }

    //Colors the keys. Use background for other keys. Leave empty to use them as they are
    updateKeys(keys, color: string | { r: number, g: number, b: number }, backgroundColor?: string | { r: number, g: number, b: number }) {
        //Fill background or leave as it is
        if (backgroundColor) {
            if (typeof backgroundColor === 'string') {
                this.currentColors = vulcanHelpers.getKeys(helpers.hexToRgb(backgroundColor));
            } else {
                this.currentColors = vulcanHelpers.getKeys(backgroundColor);
            }
        }

        for (let i in keys) {
            const key = keys[i];

            //When key is string, find corresponding id. If integer, it is already the id
            let id = key;
            if (typeof (key) === 'string') {

                if (!(key in this.keyList.KEYMAPPER)) {
                    console.log("Key " + key + " not found in Keylist");
                    return;
                }

                id = this.keyList.KEYMAPPER[key];
            }

            let rgbColor: { r: number, g: number, b: number };
            if (typeof color === "string") {
                rgbColor = helpers.hexToRgb(color);
            } else {
                console.log("Wrong color. Must be hex-string (#ffcc00) or object ({r: 255, g: 255, b:255}")
                console.log(color)
            }

            this.currentColors[id] = rgbColor;
        }
    }

    render(): void {
        //Transform color objects to stream
        const colorBuffer = vulcanHelpers.buildColorBuffer(this.currentColor);

        //Add signals to array
        let buffer = [0xa1, 0x01, 0x01, 0xb4].concat(colorBuffer);

        //Send 64bits per run
        for (let i = 0; i < Math.ceil(buffer.length) / 64; i++) {
            const iFrom = i * 64;
            const iTo = iFrom + 64;

            const r = this.ledDevice.write([0x00].concat(buffer.slice(iFrom, iTo)));
            if (r < 65) {
                console.error("Could not send data")
            }
        }

    }

    updateKey(key, color: string | {r:number, g:number, b:number}, background: string | {r:number, g:number, b:number}): void {
        this.updateKeys([key], color, background);
    }

    private animate(keys, colorFrom, colorTo, duration) {
        let start = Date.now();
        let rgbFrom = helpers.hexToRgb(colorFrom);
        let rgbTo = helpers.hexToRgb(colorTo);
        let rgbRunning = Object.assign({}, rgbFrom);

        const rMax = rgbTo.r - rgbFrom.r;
        const gMax = rgbTo.g - rgbFrom.g;
        const bMax = rgbTo.b - rgbFrom.b;

        const timer = setInterval(() => {

            let runningTime = Date.now() - start;
            runningTime = runningTime > duration ? duration : runningTime;

            //Calculate new RGB-Value
            const percentage = 100 / duration * runningTime;
            rgbRunning.r = Math.round(rgbFrom.r + rMax / 100 * percentage);
            rgbRunning.g = Math.round(rgbFrom.g + gMax / 100 * percentage);
            rgbRunning.b = Math.round(rgbFrom.b + bMax / 100 * percentage);

            if (keys) {
                //Send new Value
                this.updateKeys(keys, rgbRunning)
            } else {
                //Send new Value
                this.fillAll(rgbRunning);
                this.render();
            }

            //Clear Timer if duration ends
            if (runningTime >= duration) {
                const t = this.animateTimers.find(e => e === timer)
                if (t)
                    clearInterval(t)
            }

        }, consts.ANIMATIONINTERVAL);
        this.animateTimers.push(timer);
    }

    animateAll(colorFrom: string, colorTo: string, duration) {
        this.animate(null, colorFrom, colorTo, duration);
    }

    animateKeys(keys, colorFrom, colorTo, duration) {
        this.animate(keys, colorFrom,colorTo,duration);
    }

    close() {
        if (this.ledDevice) {
            this.ledDevice.close();
        }
    }

    write(text, color, keyOffset) {
        //Convert Color
        const rgbColor = helpers.hexToRgb(color);

        //Create empty binary grid
        let binaryGrid = this.grid.KEYGRID.map(row => row.map(cell => 0));

        let gridPos = keyOffset;
        for (let i = 0; i < text.length; i++) {
            const char = this.alphabet[text.charAt(i)];
            for (let row = 0; row < char.length; row++) {
                for (let column = 0; column < char[row].length; column++) {
                    binaryGrid[row][column + gridPos] = char[row][column];
                }
            }

            //Update gridPos
            gridPos += char[0].length + keyOffset;
        }

        //Create Screen and map binarygrid to it
        let screen = vulcanHelpers.getKeys(helpers.hexToRgb('#000000'));
        for (let row = 0; row < binaryGrid.length; row++) {
            for (let column = 0; column < binaryGrid[row].length; column++) {
                if (column > this.grid.KEYGRID[row].length)
                    break

                //Search corresponding key
                if (binaryGrid[row][column] === 1 && this.grid.KEYGRID[row][column] != consts.NOKEY) {
                    screen[this.grid.KEYGRID[row][column]] = rgbColor;
                }
            }
        }

        this.currentColors = screen;
        this.render();
    }

    marquee(text, color, speed) {
        //Convert Color
        const rgbColor = helpers.hexToRgb(color);

        //Create empty binary grid
        let binaryGrid = this.grid.KEYGRID.map(row => row.map(cell => 0));

        //Create textgrid
        let textGrid = [[], [], [], [], [], []];

        const emptyLine = new Array(6).fill(new Array(consts.SPACEBETWEENCHARS).fill(0));
        // const emptyLine = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]

        for (let i = 0; i < text.length; i++) {
            const char = this.alphabet[text.charAt(i)];
            textGrid = textGrid.map((row, j) => row.concat(emptyLine[j]).concat(char[j]))
        }

        //Concat Binary and Textgrid
        binaryGrid = binaryGrid.map((row, i) => row.concat(textGrid[i]));

        //TEST
        // binaryGrid = textGrid;


        const timer = setInterval(() => {

            //Remove first row of grid
            for (let row in binaryGrid)
                binaryGrid[row].shift();

            //Get black screen
            let screen = vulcanHelpers.getKeys(helpers.hexToRgb('#000000'));

            for (let row = 0; row < binaryGrid.length; row++) {
                for (let column = 0; column < binaryGrid[row].length; column++) {
                    if (column > this.grid.KEYGRID[row].length)
                        break

                    //Search corresponding key
                    if (binaryGrid[row][column] === 1 && this.grid.KEYGRID[row][column] != consts.NOKEY) {
                        screen[this.grid.KEYGRID[row][column]] = rgbColor;
                    }
                }
            }

            this.currentColors = screen;

            this.render();

            //Clear Timer if no grid columns left
            if (binaryGrid[0].length === 0) {
                const t = this.animateTimers.find(e => e === timer)
                console.log("finished")
                if (t)
                    clearInterval(t)
            }

        }, speed);
        this.animateTimers.push(timer);

    }

    animationQueueAdd(animation, delay) {
        this.animationQueue.push({animation: animation, delay: delay});
    }

    animationQueueStart(onFinish) {
        if (this.animationQueue.length === 0) {
            onFinish();
            return;
        }

        let animationQueueCurrent = 0;

        const nextAnimation = () => {
            setTimeout(() => {

                //Perhaps animationqueue has already stopt
                if (this.animationQueue.length === 0)
                    return;

                //Start Animation
                this.animationQueue[animationQueueCurrent].animation()

                animationQueueCurrent++;

                //Has animation? Trigger. Otherwise: Trigger callback
                if (animationQueueCurrent < this.animationQueue.length)
                    nextAnimation();
                else if (onFinish)
                    onFinish()


            }, this.animationQueue[animationQueueCurrent].delay)
        }

        //Start Animation
        nextAnimation();
    }

    animationQueueStop() {
        this.animationQueue = [];
        this.animationQueueCurrent = 0;
    }

    renderStart(interval) {
        this.renderStop();

        interval = interval ? interval : consts.ANIMATIONINTERVAL;
        this.autoRender = setInterval(() => this.render(), interval);
    }

    renderStop() {
        if (this.autoRender)
            clearInterval(this.autoRender);
    }

}