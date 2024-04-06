import "../style/modal_search.css"
import { Select } from "antd";
import useDebounce from "../../../functions/useDebounce";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Modal_Search(props) {
    const { Option } = Select;
    const [searchOption, setSearchOption] = useState("name");

    const [searchInput, setSearch] = useState("");
    const navigate = useNavigate();
    const handleOverlayClick = () => {
        // Close the modal if the overlay is clicked
        props.onClose();
    };
    const handleSearch = () => {
        props.onClose();
        navigate(`/search/${searchOption}/${searchInput}`);
    }
    const inputSearch = useDebounce(searchInput, 2000);
    useEffect(() => {
        console.log(inputSearch);
        console.log(searchOption);
    }, [inputSearch])
    return (
        <div className="modal_search">
            <div className="wrap_close">
                <button className="close_btn" onClick={handleOverlayClick}><i class="bi bi-x-lg"></i></button>
            </div>
            <div className="wrap_query">
                <Select defaultValue={"name"} variant="borderless" onChange={(value) => { setSearchOption(value) }}>
                    <Option value="name" style={{ fontSize: "24px", color: "rgb(255, 255, 255)", backgroundColor: " rgb(30, 30, 30)", borderRadius: "0" }}>By name</Option>
                    <Option value="code" style={{ fontSize: "24px", color: "rgb(255, 255, 255)", backgroundColor: " rgb(30, 30, 30)", borderRadius: "0" }}>By code</Option>
                </Select>
                <input type="search" onChange={(e) => { setSearch(e.target.value) }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }
                    }
                />
            </div>
        </div>
    );
}

export default Modal_Search;