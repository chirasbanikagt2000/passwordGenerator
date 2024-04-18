import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false) 
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()-=+_{}[]~`"
    for(let i=1;i<=length;i++)
    {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const passwordToClip = useCallback(()=>{
    passwordRef.current?.select()
    //passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)
   // window.alert("Text coppied successfully!!")
  },[password])


  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])
  
    return (
      <>
        <h1 className=" text-4xl text-white text-center mt-5 my-3">Password Generator</h1>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        
         <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input 
          type="text" 
          value={password}
          className='outline-none w-full  py-2 my-8 px-4 rounded-lg'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button
          onClick={passwordToClip}
          className='outline-none   py-2 my-8 px-4 rounded-lg text-white gap-x-1 bg-sky-500 hover:bg-sky-700 ..."'
          >Copy</button>

         </div>
         <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}

            />
            <label>Length: {length}</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label> Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={()=>{
              setCharAllowed((prev) => !prev);
            }}
            />
            <label> Characters</label>
          </div>
         </div>
        </div>
      
      </>
    )
}

export default App
