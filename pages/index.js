import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

function HomePage() {
  const [search, setSearchValue] = useState(" ");
  const [data, setData] = useState({});
  const [iserror, setError] = useState(" ");

  useEffect(() => {
    getDataHandler(search);
  }, []);
  const regexExpIP =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  const regexExpDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  async function getDataHandler(search) {
    let api_key = process.env.NEXT_PUBLIC_API_KEY;
    let api_url = "https://geo.ipify.org/api/v1?";
    try {
      let res = await fetch(
        `${api_url}apiKey=${api_key}&
        ${
          regexExpIP.test(search)
            ? `ipAddress=${search}`
            : regexExpDomain.test(search)
            ? `domain=${search}`
            : ""
        }`
      );
      let data = await res.json();
      data.code ? setError("Oops! data not available") : setData(data);
    } catch (error) {}
  }

  const Map = React.useMemo(
    () =>
      dynamic(() => import("../components/DisplayMap"), {
        loading: () => <Spinner />,
        ssr: false,
      }),
    [data]
  );

  return (
    <div className="wrapper">
      <Head>
        <title>IP Tracker</title>
        <meta name="description" content="IP Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        data={data}
        getDataHandler={getDataHandler}
        setSearchValue={setSearchValue}
        search={search}
      />
      {data.location ? (
        <Map
          datalat={data.location?.lat}
          datalng={data.location?.lng}
          data={data}
        />
      ) : iserror ? (
        <p className="error">{iserror}</p>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default HomePage;
