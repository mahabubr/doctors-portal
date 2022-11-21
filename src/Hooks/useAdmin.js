import { useEffect, useState } from "react"

const useAdmin = (email) => {

    const [isAdmin, setIsAdmin] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (email) {
            fetch(`https://doctors-portal-server-gules.vercel.app/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin)
                    setIsLoading(false)
                })
        }
    }, [email])


    return [isAdmin, isLoading]



}

export default useAdmin