export default function capitaliseName(name: string){
    return `${name.slice(0,1).toUpperCase()}${name.slice(1)}`
}