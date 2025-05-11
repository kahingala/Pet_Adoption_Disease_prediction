import React, { useState } from 'react'
import { assets } from '../assets/assets' 
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Dog")
  const [subCategory, setsubCategory] = useState("Food")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [nameError, setNameError] = useState("")
  const [priceError, setPriceError] = useState("")

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Z\s]*$/ // Only letters and spaces
    if (!value) {
      return "Product name is required"
    }
    if (!nameRegex.test(value)) {
      return "Product name can only contain letters and spaces"
    }
    return ""
  }

  const validatePrice = (value) => {
    const priceRegex = /^\d*\.?\d*$/ // Only numbers and optional decimal
    if (!value) {
      return "Price is required"
    }
    if (!priceRegex.test(value)) {
      return "Price must be a valid number"
    }
    return ""
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    // Validate inputs
    const nameValidationError = validateName(name)
    const priceValidationError = validatePrice(price)

    setNameError(nameValidationError)
    setPriceError(priceValidationError)

    // If there are validation errors, prevent submission
    if (nameValidationError || priceValidationError) {
      toast.error("Please fix the validation errors")
      return
    }

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setNameError('')
        setPriceError('')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input 
          onChange={(e) => {
            setName(e.target.value)
            setNameError(validateName(e.target.value))
          }} 
          value={name} 
          className='w-full max-w-[500px] px-3 py-2' 
          type="text" 
          placeholder='Type here' 
          required 
        />
        {nameError && <p className='text-red-500 text-sm mt-1'>{nameError}</p>}
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea 
          onChange={(e) => setDescription(e.target.value)} 
          value={description} 
          className='w-full max-w-[500px] px-3 py-2' 
          placeholder='Write content here' 
          required 
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setsubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Food">Food</option>
            <option value="Medicine">Medicine</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input 
            onChange={(e) => {
              setPrice(e.target.value)
              setPriceError(validatePrice(e.target.value))
            }} 
            value={price} 
            className='w-full px-3 py-2 sm:w-[120px]' 
            type="text" 
            placeholder='25' 
            required 
          />
          {priceError && <p className='text-red-500 text-sm mt-1'>{priceError}</p>}
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes("1kg") ? prev.filter(item => item !== "1kg") : [...prev, "1kg"])}>
            <p
              className={`px-3 py-1 cursor-pointer ${sizes.includes("1kg") ? "text-black" : "text-black"}`}
              style={{
                backgroundColor: sizes.includes("1kg") ? "#d4c49e" : "#e2e8f0",
              }}
            >
              1kg
            </p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("5kg") ? prev.filter(item => item !== "5kg") : [...prev, "5kg"])}>
            <p
              className={`px-3 py-1 cursor-pointer ${sizes.includes("5kg") ? "text-black" : "text-black"}`}
              style={{
                backgroundColor: sizes.includes("5kg") ? "#d4c49e" : "#e2e8f0",
              }}
            >
              5kg
            </p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("12kg") ? prev.filter(item => item !== "12kg") : [...prev, "12kg"])}>
            <p
              className={`px-3 py-1 cursor-pointer ${sizes.includes("12kg") ? "text-black" : "text-black"}`}
              style={{
                backgroundColor: sizes.includes("12kg") ? "#d4c49e" : "#e2e8f0",
              }}
            >
              12kg
            </p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add