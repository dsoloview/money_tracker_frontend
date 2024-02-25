type Props = {
    children: string

}

const PageTitle = ({children}: Props) => {
    return (
        <h1 className="text-2xl font-bold">{children}</h1>
    );
}

export default PageTitle;