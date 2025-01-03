// export const baseUrl: string = "http://192.168.1.231:5000";
export const baseUrl: string = "https://client1-backend.onrender.com";

export const domain: string = "https://global-gestion-fbf6b.web.app"

export const API_KEY_SECRETE = "pk_sandbox_B73VkuUyvvUuVMaVdCBnccyZ";

export const API_KEY_SECRETE_TEST = "sk_sandbox_ricGepZOgS0u4YviGOnarIPc"

export const fedapayBASEURL = "https://api.fedapay.com/v1/";

export const fedapayBASEURL_TEST = "https://sandbox-api.fedapay.com/v1/"

export const paymentURL = "https://process.fedapay.com/"



export const apiUrl: string = baseUrl + "/api/"

export async function fetchPostForStripe(url: string, data?: {}){
    try{
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data || {}),
        })
        
        return await response.json();
    }catch (e) {
        console.log(e)
        // throw new Error(e.message);
    }
}