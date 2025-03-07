

let INITIAL_STATE = {
    posts : [],
    updateIndex :  null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_ALL': 
            return {
                ...state,
                posts: action.payload
            }
        case 'CREATE': 
            return {
                ...state,                   
                posts: [...state.posts, action.payload]
            }
        case 'UPDATE': 
        case 'LIKE_POST':
            return {
                ...state, 
                posts: state.posts.map((post) => 
                    post._id === action.payload._id ? action.payload : post
                )
            }
        case 'DELETE': 
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload)
            }
        case 'EDIT_POST_INDEX': 
            return {
                ...state, 
                updateIndex : action.payload
            }
        default: 
            return state;
    }
}
