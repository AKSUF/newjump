import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  UploadImagesRoles,
  checkIfJumpStartIdsUnique,
  registerUserLocal,
} from "../../service/RoleBasedRegistration";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  about: string;
  phone_number: string;
  birth: string;
  gender: string;
  district: string;
  address: string;
  jumpStartId: string;
}

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const districts = [
  { label: "Chittagong", value: "Chittagong" },
  { label: "Dhaka", value: "Dhaka" },
  { label: "Cumilla", value: "Cumilla" },
  { label: "Barisal", value: "Barisal" },
  { label: "Jessore", value: "Jessore" },
  { label: "Rajshahi", value: "Rajshahi" },
  { label: "Cox's Bazar", value: "Cox's Bazar" },
  { label: "Khulna", value: "Khulna" },
  { label: "Sylhet", value: "Sylhet" },
];

const EmployeeDetails: React.FC = () => {
  const formStyle: React.CSSProperties = {
    width: "45%",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    margin: "auto",
  };
  const { token } = useParams();
  const [imageFile, setImageFile] = useState();
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    about: "",
    phone_number: "",
    birth: "",
    gender: "",
    district: "",
    address: "",
    jumpStartId: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value as string });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.name.length < 2) {
      toast.error("Name Must be 2 letters");
      return;
    }
    if (formData.phone_number.length <11) {
      toast.error("Phone number must be 11 characters");
      return;
    }
    if (formData.address.length <10) {
      toast.error("Address must be 10 characters");
      return;
    }
    if (formData.jumpStartId.length <8) {
      toast.error("JumpStart Id must be 10 characters");
      return;
    }
    if (formData.about.length <10) {
      toast.error("Write about yourself at leasr 10 characters");
      return;
    }
    
    
    registerUserLocal(formData, token)
      .then((res) => {
        UploadImagesRoles(res.data.roleBasedDetailsId, imageFile)
          .then((res) => {
            toast.success("Image uploaded");
          })
          .catch((error) => {
            toast.error("error in uploading image");
            console.log(error);
          });
        toast.success("Employee Details Uploaded");
        navigate("/thank-you")
        setFormData({
          name: "",
          about: "",
          phone_number: "",
          birth: "",
          gender: "",
          district: "",
          address: "",
          jumpStartId: "",
        });
      })
      .catch((error) => {
        toast.error("Product Details not  Uploaded due to some error !! ");
        console.log(error);
      });
    
      
  };
  const handleFileChage = (event: any) => {
    console.log(event.target.files[0]);
    setImageFile(event.target.files[0]);
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      p={10}
      className="emp"
    >
      <form style={formStyle} onSubmit={handleSubmit}>
      <Typography variant="h6" color={"green"} className="uppercase" fontWeight={"bold"} textAlign={"center"} gutterBottom>
          EMPLOYEE DETAILS FORM
        </Typography>
        
        <FormControl className="text-center" fullWidth>
          <input
            id="image-input"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChage}
            style={{ display: "none", margin: "10px 0", width: "100%" }}
          />
          <label htmlFor="image-input">
          {!preview && (
    <div style={{ margin: "0 auto", display: "inline-block", backgroundColor: "#e6e6e6", borderRadius: "50%", width: 100, height: 100 }}>
      <span style={{ lineHeight: "100px", color: "#757575", fontSize: "16px" }}>Upload Image</span>
    </div>
  )}
            {preview && (
              <div style={{ margin: "0 auto", display: "inline-block" }}>
                <img
                  src={preview}
                  alt="Selected"
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
              </div>
            )}

            <Box mt={1}>
              <Button variant="contained" component="span">
                Choose Image
              </Button>
            </Box>
          </label>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="name-input">Name</InputLabel>
          <Input
            id="name-input"
            name="name"
            style={{ margin: "10px 0", width: "100%" }}
            value={formData.name}
            onChange={handleInputChange}
            required
            />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="phone-number-input">Phone Number</InputLabel>
          <Input
            id="phone-number-input"
            name="phone_number"
            style={{ margin: "10px 0", width: "100%" }}
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <Input
            id="birth-date-input"
            name="birth"
            type="date"
            style={{ margin: "10px 0", width: "100%" }}
            value={formData.birth}
            onChange={handleInputChange}
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="gender-select">Gender</InputLabel>
          <Select
            id="gender-select"
            name="gender"
            style={{ marginBottom: "10px", width: "100%" }}
            value={formData.gender}
            onChange={handleSelectChange}
            required
          >
            {genders.map((gender) => (
              <MenuItem key={gender.value} value={gender.value}>
                {gender.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="district-select">District</InputLabel>
          <Select
            id="district-select"
            name="district"
            style={{ marginBottom: "10px", width: "100%" }}
            value={formData.district}
            onChange={handleSelectChange}
            required
          >
            {districts.map((district) => (
              <MenuItem key={district.value} value={district.value}>
                {district.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="jumpstart-id-input">JumpStart ID</InputLabel>
          <Input
            id="jumpstart-id-input"
            name="jumpStartId"
            style={{ margin: "10px 0", width: "100%" }}
            value={formData.jumpStartId}
            onChange={handleInputChange}
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="address-input">Address</InputLabel>
          <Input
            id="address-input"
            name="address"
            style={{ margin: "10px 0", width: "100%" }}
            value={formData.address}
            onChange={handleInputChange}
          />
        </FormControl>
        <TextField
          label="About Me"
          name="about"
          id="about"
          value={formData.about}
          onChange={handleInputChange}
          multiline
          fullWidth
          style={{ margin: "10px 0", width: "100%" }}
          variant="outlined"
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};
export default EmployeeDetails;