import "./../style/banner_big.css"

function Banner_Big(props) {
    return (
        <div className="banner_big">
            <h1>{props.info}</h1>
        </div>
    );
}
export default Banner_Big;