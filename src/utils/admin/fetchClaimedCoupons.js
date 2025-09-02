import axios from "axios";

export async function fetchClaimedCoupons() {
  try {
    const res = await axios.get("/api/admin/fetch-claimed-coupons");
    console.log("claimed coupons== ", res);
    return { success: true, coupons: res.data.coupons };
  } catch (error) {
    console.error("Error from fetchClaimedCoupons:", error);
    return { success: false, error: error.response.data.message };
  }
}
