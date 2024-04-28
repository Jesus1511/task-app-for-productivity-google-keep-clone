import axios from './axios.config.js'

export const logUser = (data) => {
    return axios.post('/login', data)
        .then(response => {
            return response.data
            })
        .catch(error => {
            console.error('Error:', error);
            throw error
            });
}

export const singUser = (data) => {
    return axios.post('/register', data)
        .then(response => {
            return response.data
            })
        .catch(error => {
            console.error('Error:', error);
            throw error
            });
}

export const getUser = () => {
    return axios.get('/profile')
        .then((response) => {
            return response.data
        })
        .catch(() => {
            return null
        })
}

export const logout = () => {
    return axios.post('/logout')
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error)
            return null
        })
}

export const createFolder = (data) => {
    return axios.post('/folders/create', data)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw(error)
        })
}

export const deleteFolder = (data) => {
    return axios.delete('/folders/delete',{
        data: data
    })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw(error)
        })
}

export const updateFolder = (data) => {
    return axios.patch('/folders/update', data)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw(error)
        })
}

export const createTask = (data) => {
    return axios.post('/folders/tasks/create', data)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw(error)
        })

}

export const deleteTask = (data) => {
    return axios.delete('/folders/tasks/delete',{
        data: data
    })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw(error)
        })
}

export const updateTask = (data) => {
    return axios.patch('/folders/tasks/update', data)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw(error)
        })
}

export const createBox = (data) => {
    return axios.post('/folders/completable/create', data)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw(error)
        })
}

export const updateBox = (data) => {
    return axios.patch('/folders/completable/update', data)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw(error)
        })
}