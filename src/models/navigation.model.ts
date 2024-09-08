export interface ILink {
    href: string
    name: string
}

export interface IMobileLink extends ILink {
    icon?: JSX.Element
}