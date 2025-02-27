import "./styles.sass";
import React, { useEffect, useState } from "react";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

const Search: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <div className={`_Search ${search.length && "-filled"}`}>
      <input
        type="text"
        placeholder="Текст"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="icon" />
    </div>
  );
};

export default Search;
