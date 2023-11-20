

class Service {
    _apiBase = 'https://jsonplaceholder.typicode.com';

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Status ${res.status}`);
        }

        return await res.json();
    }

    getUsers = () => {
        return this.getResource(`${this._apiBase}/users`);
    }

    getUser = (id) => {
        return this.getResource(`${this._apiBase}/users/${id}`);
    }

    getUsersByName = async (query) => {
        try {
            const allUsers = await this.getUsers();
        
            if (query) {
                const filteredUsers = allUsers.filter(user =>
                    user.name.toLowerCase().includes(query.toLowerCase())
                );
                return filteredUsers;
            }
        
            return allUsers;
        } catch (error) {
            console.error('Error fetching users by name:', error);
            throw new Error('Failed to fetch users by name');
        }
    }

    getAlbumsByUser = (userId) => {
        return this.getResource(`${this._apiBase}/albums?userId=${userId}`);
    }

    getAlbum = (id) => {
        return this.getResource(`${this._apiBase}/albums/${id}`);
    }

    getAlbumPhotos = (id) => {
        return this.getResource(`${this._apiBase}/albums/${id}/photos`);
    }

    getPostsByUser = (userId) => {
        return this.getResource(`${this._apiBase}/posts?userId=${userId}`);
    }

    getPost = (id) => {
        return this.getResource(`${this._apiBase}/posts/${id}`);
    }
}

export default Service;