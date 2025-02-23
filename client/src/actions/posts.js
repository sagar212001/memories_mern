import * as api from '../api'

//Action Creators

// used thunk for async call , we used saga

export const getPosts = () => async(dispatch) => {

    try {
        const { data } = await api.fetchPosts()

        dispatch({ type : 'FETCH_ALL', payload : data})
        
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async(dispatch) => {

    try {
        const { data } = await api.createPost(post)

        dispatch({ type : 'CREATE', payload : data})
        
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, updatePost) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatePost)

        dispatch({ type : 'UPDATE', payload : data})
        
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({ type : 'DELETE', payload : id})
        
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (id , liked) => async(dispatch) => {

    try {
        const { data } = await api.likePost(id, liked)

        dispatch({ type : 'LIKE_POST', payload : data })
        
    } catch (error) {
        console.log(error.message)
    }
}
