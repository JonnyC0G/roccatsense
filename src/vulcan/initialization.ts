import * as helpers from "../helpers";

function writeControl(ctrlDevice, data: number[]): number[] {
    return ctrlDevice.sendFeatureReport(data)
}

export function run(ctrlDevice): Promise<void> {
    return new Promise<void>((resolve, reject) => {

        //Send Data
        writeControl(ctrlDevice, [0x15, 0x00, 0x01]);

        helpers.sleep()

            //Send next Config
            .then(() => {
                writeControl(ctrlDevice, [0x05, 0x04, 0x00, 0x04]);
                return helpers.sleep()
            })

            //Send next config
            .then(() => {
                writeControl(ctrlDevice, [
                    0x07, 0x5f, 0x00, 0x3a, 0x00, 0x00, 0x3b, 0x00, 0x00, 0x3c, 0x00, 0x00,
                    0x3d, 0x00, 0x00, 0x3e, 0x00, 0x00, 0x3f, 0x00, 0x00, 0x40, 0x00, 0x00,
                    0x41, 0x00, 0x00, 0x42, 0x00, 0x00, 0x43, 0x00, 0x00, 0x44, 0x00, 0x00,
                    0x45, 0x00, 0x00, 0x46, 0x00, 0x00, 0x47, 0x00, 0x00, 0x48, 0x00, 0x00,
                    0xb3, 0x00, 0x00, 0xb4, 0x00, 0x00, 0xb5, 0x00, 0x00, 0xb6, 0x00, 0x00,
                    0xc2, 0x00, 0x00, 0xc3, 0x00, 0x00, 0xc0, 0x00, 0x00, 0xc1, 0x00, 0x00,
                    0xce, 0x00, 0x00, 0xcf, 0x00, 0x00, 0xcc, 0x00, 0x00, 0xcd, 0x00, 0x00,
                    0x46, 0x00, 0x00, 0xfc, 0x00, 0x00, 0x48, 0x00, 0x00, 0xcd, 0x0e,
                ]);
                return helpers.sleep()
            })

            //Send next config
            .then(() => {
                writeControl(ctrlDevice, [0x0a, 0x08, 0x00, 0xff, 0xf1, 0x00, 0x02, 0x02]);
                return helpers.sleep()
            })

            //Send next config
            .then(() => {
                writeControl(ctrlDevice, [0x0a, 0x08, 0x00, 0xff, 0xf1, 0x00, 0x02, 0x02]);
                return helpers.sleep()
            })

            //Send next config
            .then(() => {
                writeControl(ctrlDevice, [
                    0x06, 0x85, 0x00, 0x3a, 0x29, 0x35, 0x1e, 0x2b, 0x39, 0xe1, 0xe0, 0x3b,
                    0x1f, 0x14, 0x1a, 0x04, 0x64, 0x00, 0x00, 0x3d, 0x3c, 0x20, 0x21, 0x08,
                    0x16, 0x1d, 0xe2, 0x3e, 0x23, 0x22, 0x15, 0x07, 0x1b, 0x06, 0x8b, 0x3f,
                    0x24, 0x00, 0x17, 0x0a, 0x09, 0x19, 0x91, 0x40, 0x41, 0x00, 0x1c, 0x18,
                    0x0b, 0x05, 0x2c, 0x42, 0x26, 0x25, 0x0c, 0x0d, 0x0e, 0x10, 0x11, 0x43,
                    0x2a, 0x27, 0x2d, 0x12, 0x0f, 0x36, 0x8a, 0x44, 0x45, 0x89, 0x2e, 0x13,
                    0x33, 0x37, 0x90, 0x46, 0x49, 0x4c, 0x2f, 0x30, 0x34, 0x38, 0x88, 0x47,
                    0x4a, 0x4d, 0x31, 0x32, 0x00, 0x87, 0xe6, 0x48, 0x4b, 0x4e, 0x28, 0x52,
                    0x50, 0xe5, 0xe7, 0xd2, 0x53, 0x5f, 0x5c, 0x59, 0x51, 0x00, 0xf1, 0xd1,
                    0x54, 0x60, 0x5d, 0x5a, 0x4f, 0x8e, 0x65, 0xd0, 0x55, 0x61, 0x5e, 0x5b,
                    0x62, 0xa4, 0xe4, 0xfc, 0x56, 0x57, 0x85, 0x58, 0x63, 0x00, 0x00, 0xc2,
                    0x24,
                ]);
                return helpers.sleep()
            })

            //Send next config
            .then(() => {
                writeControl(ctrlDevice, [
                    0x09, 0x2b, 0x00, 0x49, 0x00, 0x00, 0x4a, 0x00, 0x00, 0x4b, 0x00, 0x00,
                    0x4c, 0x00, 0x00, 0x4d, 0x00, 0x00, 0x4e, 0x00, 0x00, 0xa4, 0x00, 0x00,
                    0x8e, 0x00, 0x00, 0xd0, 0x00, 0x00, 0xd1, 0x00, 0x00, 0x00, 0x00, 0x00,
                    0x01, 0x00, 0x00, 0x00, 0x00, 0xcd, 0x04,
                ]);
                return helpers.sleep()
            })

            //Send next config
            .then(() => {
                writeControl(ctrlDevice, [
                    0x0d, 0xbb, 0x01, 0x00, 0x06, 0x0b, 0x05, 0x45, 0x83, 0xca, 0xca, 0xca,
                    0xca, 0xca, 0xca, 0xce, 0xce, 0xd2, 0xce, 0xce, 0xd2, 0x19, 0x19, 0x19,
                    0x19, 0x19, 0x19, 0x23, 0x23, 0x2d, 0x23, 0x23, 0x2d, 0xe0, 0xe0, 0xe0,
                    0xe0, 0xe0, 0xe0, 0xe3, 0xe3, 0xe6, 0xe3, 0xe3, 0xe6, 0xd2, 0xd2, 0xd5,
                    0xd2, 0xd2, 0xd5, 0xd5, 0xd5, 0xd9, 0xd5, 0x00, 0xd9, 0x2d, 0x2d, 0x36,
                    0x2d, 0x2d, 0x36, 0x36, 0x36, 0x40, 0x36, 0x00, 0x40, 0xe6, 0xe6, 0xe9,
                    0xe6, 0xe6, 0xe9, 0xe9, 0xe9, 0xec, 0xe9, 0x00, 0xec, 0xd9, 0xd9, 0xdd,
                    0xd9, 0xdd, 0xdd, 0xe0, 0xe0, 0xdd, 0xe0, 0xe4, 0xe4, 0x40, 0x40, 0x4a,
                    0x40, 0x4a, 0x4a, 0x53, 0x53, 0x4a, 0x53, 0x5d, 0x5d, 0xec, 0xec, 0xef,
                    0xec, 0xef, 0xef, 0xf2, 0xf2, 0xef, 0xf2, 0xf5, 0xf5, 0xe4, 0xe4, 0x00,
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x5d, 0x5d, 0x00,
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf5, 0xf5, 0x00,
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe4, 0xe4, 0xe8,
                    0xe8, 0xe8, 0xe8, 0xe8, 0xeb, 0xeb, 0xeb, 0x00, 0xeb, 0x5d, 0x5d, 0x67,
                    0x67, 0x67, 0x67, 0x67, 0x70, 0x70, 0x70, 0x00, 0x70, 0xf5, 0xf5, 0xf8,
                    0xf8, 0xf8, 0xf8, 0xf8, 0xfb, 0xfb, 0xfb, 0x00, 0xfb, 0xeb, 0xef, 0xef,
                    0xef, 0x00, 0xef, 0xf0, 0xf0, 0xed, 0xf0, 0xf0, 0x00, 0x70, 0x7a, 0x7a,
                    0x7a, 0x00, 0x7a, 0x7a, 0x7a, 0x6f, 0x7a, 0x7a, 0x00, 0xfb, 0xfd, 0xfd,
                    0xfd, 0x00, 0xfd, 0xf8, 0xf8, 0xea, 0xf8, 0xf8, 0x00, 0xed, 0xed, 0xea,
                    0xed, 0xed, 0x00, 0xed, 0xea, 0xea, 0xf6, 0xe7, 0xea, 0x6f, 0x6f, 0x65,
                    0x6f, 0x6f, 0x00, 0x6f, 0x65, 0x65, 0x66, 0x5a, 0x65, 0xea, 0xea, 0xdc,
                    0xea, 0xea, 0x00, 0xea, 0xdc, 0xdc, 0x00, 0xce, 0xdc, 0xea, 0xe7, 0xe5,
                    0xe7, 0xe5, 0xe5, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x65, 0x5a, 0x50,
                    0x5a, 0x50, 0x50, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xdc, 0xce, 0xc0,
                    0xce, 0xc0, 0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe7, 0x00, 0x00,
                    0xe2, 0xe2, 0xe2, 0xe2, 0xdf, 0xdf, 0xdf, 0xdf, 0xdf, 0x5a, 0x00, 0x00,
                    0x45, 0x45, 0x45, 0x45, 0x3b, 0x3b, 0x3b, 0x3b, 0x3b, 0xce, 0x00, 0x00,
                    0xb2, 0xb2, 0xb2, 0xb2, 0xa4, 0xa4, 0xa4, 0xa4, 0xa4, 0xdc, 0xdc, 0xdc,
                    0xdc, 0x00, 0xda, 0xda, 0xda, 0xda, 0xda, 0x00, 0xd7, 0x30, 0x30, 0x30,
                    0x30, 0x00, 0x26, 0x26, 0x26, 0x26, 0x26, 0x00, 0x1c, 0x96, 0x96, 0x96,
                    0x96, 0x00, 0x88, 0x88, 0x88, 0x88, 0x88, 0x00, 0x7a, 0xd7, 0xd7, 0xd7,
                    0x00, 0xd4, 0xd4, 0xd4, 0xd4, 0xd4, 0xd1, 0xd1, 0xd1, 0x1c, 0x1c, 0x1c,
                    0x00, 0x11, 0x11, 0x11, 0x11, 0x11, 0x06, 0x06, 0x06, 0x7a, 0x7a, 0x7a,
                    0x00, 0x6c, 0x6c, 0x6c, 0x6c, 0x6c, 0x5e, 0x5e, 0x5e, 0x00, 0x00, 0x00,
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x24, 0xcf,
                ]);
                return helpers.sleep()
            })

            //Send next config
            .then(() => {
                writeControl(ctrlDevice, [0x13, 0x08, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00]);
                return helpers.sleep()
            })

            .then(() => resolve());
    });


}