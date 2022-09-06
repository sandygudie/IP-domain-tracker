import React from "react";
import Image from 'next/image'

function Header({ data, getDataHandler, search, setSearchValue }) {
  const handleChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  return (
    <div className="top_bg">
      <p className="title">IP Address Tracker</p>
      <div className="search_form">
        <input
          onChange={(e)=>handleChange(e)}
          id="searchvalue"
          type="search"
          name="searchval"
          value= {search}
          placeholder="Search for any IP address and domain"
        />
        <button
          onClick={() => getDataHandler(search)}
          type="submit"
          id="searchbtn"
        >
         <Image
      src="/images/icon-arrow.svg"
      alt="Picture of the author"
      width={10}
      height={10} 
      />
        </button>
      </div>

      <div className="display_info">
        <div>
          <p>IP Address</p>
          <span>{data?.ip}</span>
        </div>
<hr/>
        <div>
          <p>Location</p>
          <span>{data?.location?.city}</span>
        </div>
        <hr/>
        <div>
          <p>TIMEZONE</p>
          <span>{data.location?.timezone}</span>
        </div>
        <hr/>
        <div>
          <p>ISP</p>
          <span>{data?.isp}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
