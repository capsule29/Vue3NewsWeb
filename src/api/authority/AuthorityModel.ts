type Authority = {
    authority_id?: string
    authority_name?: string
}

interface NewAuthority extends Authority {
    edit?: boolean
    flag?: boolean
}

export type { Authority, NewAuthority }
