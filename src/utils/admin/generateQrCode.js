import QRCode from "qrcode";
export async function generateQrCode (couponCode){
    try {
        const qr = await QRCode.toDataURL(`http://localhost:3000?coupon_code=${couponCode}`);
        return {success:true, data:qr};
    } catch (error) {
        return {success:false, error:"failed to generate QR Code"};
    }
}