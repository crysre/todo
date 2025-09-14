function Signup(){

    function handleClick(e){

    }



    return <form className=" flex flex-col items-center gap-5 justify-center p-5 mt-25 rounded-xl h-70 w-50 bg-blue-600" >
        <input className=" p-1 rounded bg-gray-600" type="text" name="First Name" placeholder="First Name" id="" />
        <input className="p-1 rounded bg-gray-600" type="text" name="Last Name" placeholder="Last Name" id="" />
        <input className="p-1 rounded bg-gray-600" type="text" placeholder="email" />
        <input className="p-1 rounded bg-gray-600" type="password" placeholder="password" />
        <button onClick={handleClick} type="button" className=" p-1 rounded-xl bg-blue-900" >Submit</button>
    </form>
}
export default Signup;