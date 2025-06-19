import "./Footer.css";
import Logo from "../assets/GTRLogo.svg?react";
import MadeBy from "../assets/madeBy.svg?react";

export default function Footer() {
    return (
        <footer className="site-footer">
            <Logo className="footer-logo" />
            <hr className="footer-separator" />
            <p className="footer-text">
                Affiliate disclosure: Links may include an affiliate link. We may earn commissions from qualifying purchases from sites like amazon.com etc. 
                This comes at no extra cost to our users. You are not obligated to click on any link or buy any products that are advertised. 
                Per FTC guidelines, this website may be compensated by companies mentioned through advertising, affiliate programs, sponsored posts or otherwise. 
                All such content is used under fair use principles for commentary, criticism, educational purposes, and to facilitate identification. 
                This website is not affiliated with, endorsed by, or sponsored by any of the game publishers, movie studios, or developers whose works appear on this site.
                All trademarks, registered trademarks, product names, and company names or logos mentioned herein are the property of their respective owners. 
                If you are a rights holder and wish to have any content removed, please contact us at support@guessthe.wtf.
            </p>
            <MadeBy className="madeby-logo"/>
        </footer>
    );
}
