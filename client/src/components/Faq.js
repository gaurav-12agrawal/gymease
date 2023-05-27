import React from "react";
import Faqcss from '../components/styles/Faq.module.css'
import Faqcard from "./Faqcard";
import Faques from "./Faqdata";
function Faq() {
    return (
        <>
            <div className={Faqcss.main}>
                <div className={Faqcss.up}>Here are some most frequently asked question , might they will help you ...</div>
                <div className={Faqcss.down}>
                    {
                        Faques.map((value) => (
                            <div key={value.id} className={Faqcss.downmain}>
                                <Faqcard details={value} />
                            </div>
                        )
                        )
                    }
                </div>

            </div>
        </>
    );
}

export default Faq;