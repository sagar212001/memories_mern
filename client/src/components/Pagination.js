import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";

const Paginate = () => {
    return (
        <Pagination sx={{justifyContent: 'space-around'}}  count={5} page={1} variant="outlined" color="primary" 
        renderItem={(item) => {
            console.log('item???', item)
            
            return (
            <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
    )}}
        />
    )
}

export default Paginate