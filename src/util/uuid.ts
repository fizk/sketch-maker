import * as crypto from 'crypto';

const uuid = (string?: string): string => {
    let uuid = '', ii;

    if (string) {
        const shasum = crypto.createHash('sha1');
        shasum.update("6ba7b810-9dad-11d1-80b4-00c04fd430c8" + string);
        const hexsum = shasum.digest('hex');

        uuid = `${hexsum.substr(0,8)}-${hexsum.substr(8,4)}-5${hexsum.substr(12,3)}-9${hexsum.substr(17,3)}-${hexsum.substr(20,12)}`.toUpperCase();
    } else {
        for (ii = 0; ii < 32; ii += 1) {
            switch (ii) {
                case 8:
                case 20:
                    uuid += '-';
                    uuid += (Math.random() * 16 | 0).toString(16);
                    break;
                case 12:
                    uuid += '-';
                    uuid += '4';
                    break;
                case 16:
                    uuid += '-';
                    uuid += (Math.random() * 4 | 8).toString(16);
                    break;
                default:
                    uuid += (Math.random() * 16 | 0).toString(16);
            }
        }
    }

    return uuid.toUpperCase();
};

export default uuid;
