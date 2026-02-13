import Script from "next/script";
import React from "react";

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
export default function ResultLayout({children}:{ children: React.ReactNode;}){
    return <>
        <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.9/kakao.min.js" integrity="sha384-JpLApTkB8lPskhVMhT+m5Ln8aHlnS0bsIexhaak0jOhAkMYedQoVghPfSpjNi9K1" crossOrigin="anonymous" strategy="afterInteractive"
                onLoad={() => {
                    if (window.Kakao && !window.Kakao.isInitialized()) {
                        window.Kakao.init(KAKAO_JS_KEY);
                    }
                }}></Script>
        {children}
    </>
}