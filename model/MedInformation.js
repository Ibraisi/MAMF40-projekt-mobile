class MedInformation {
    constructor(gtin, expiry, lot, serial) {
        this.gtin = gtin || 'N/A';
        this.expiry = expiry || 'N/A';
        this.lot = lot || 'N/A';
        this.serial = serial || 'N/A';
    }
}
export default MedInformation;
