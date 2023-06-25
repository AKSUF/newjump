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
  registerUserLocal,
} from "../../service/RoleBasedRegistration";
import { toast } from "react-toastify";
import Rider from "../../assets/delivery.png";

interface FormData {
  name: string;
  about: string;
  phone_number: string;
  birth: string;
  gender: string;
  district: string;
  address: string;
  typeOfVehicles: string;
}

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const typeOfVehicles = [
  { label: "Bicycle", value: "bicycle" },
  { label: "Bike", value: "bike" },
  { label: "Scooter", value: "scooter" },
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

const RiderDetails: React.FC = () => {
  const formStyle: React.CSSProperties = {
    width: "80%",
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
    typeOfVehicles: "",
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
    if (formData.phone_number.length < 11) {
      toast.error("Phone number must be 11 characters");
      return;
    }
    if (formData.address.length < 10) {
      toast.error("Address must be 10 characters");
      return;
    }

    if (formData.about.length < 10) {
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
        toast.success("Rider Details Uploaded");
        navigate("/thank-you");
        setFormData({
          name: "",
          about: "",
          phone_number: "",
          birth: "",
          gender: "",
          district: "",
          address: "",
          typeOfVehicles: "",
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
      className="bg-gray-100"
    >
      <Grid container>
        <Grid item xs={7} className=" p-4 ">
          <form style={formStyle} onSubmit={handleSubmit}>
            <Typography variant="h6" color={"green"} className="uppercase" fontWeight={"bold"} textAlign={"center"} gutterBottom>
          Rider FORM
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
                  <div
                    style={{
                      margin: "0 auto",
                      display: "inline-block",
                      backgroundColor: "#e6e6e6",
                      borderRadius: "50%",
                      width: 100,
                      height: 100,
                    }}
                  >
                    <span
                      style={{
                        lineHeight: "100px",
                        color: "#757575",
                        fontSize: "16px",
                      }}
                    >
                      Upload Image
                    </span>
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
              <InputLabel htmlFor="typeOfVehicles-select">
                Type Of Vehicles
              </InputLabel>
              <Select
                id="typeOfVehicles-select"
                name="typeOfVehicles"
                style={{ marginBottom: "10px", width: "100%" }}
                value={formData.typeOfVehicles}
                onChange={handleSelectChange}
                required
              >
                {typeOfVehicles.map((t) => (
                  <MenuItem key={t.value} value={t.value}>
                    {t.label}
                  </MenuItem>
                ))}
              </Select>
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
        </Grid>
        <Grid item xs={5} className="p-4">
          <Grid container>
            <Grid item xs={12} className="flex justify-center items-center">
              <img src={Rider} alt="/" className="rounded-3xl"/>
            </Grid>
            <Grid item xs={12}>
              <h1 className="text-center text-2xl font-serif font-bold">
                About Rider
              </h1>
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
                eveniet. Quis placeat architecto fuga odio velit, quam ipsam
                amet rerum maiores! Ratione odio iure dolor velit ut facere
                assumenda iste ipsum nisi id sed exercitationem ipsam soluta
                dicta praesentium incidunt minima necessitatibus perspiciatis
                sit dignissimos, tempore error repudiandae. Nisi ullam itaque
                exercitationem error adipisci impedit facere explicabo ea
                voluptas. Ad quo voluptates nulla, quia nisi animi voluptatum ea
                quidem voluptate ut rerum mollitia distinctio, laborum qui quas
                harum vel, et accusamus veniam porro dicta ipsam dolores
                cupiditate eos! Ullam, neque voluptatem atque distinctio
                deserunt accusantium saepe sapiente aliquid pariatur officia?
              </p>
              <br />

              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
                eveniet. Quis placeat architecto fuga odio velit, quam ipsam
                amet rerum maiores! Ratione odio iure dolor velit ut facere
                assumenda iste ipsum nisi id sed exercitationem ipsam soluta
                dicta praesentium incidunt minima necessitatibus perspiciatis
                sit dignissimos, tempore error repudiandae. Nisi ullam itaque
                exercitationem error adipisci impedit facere explicabo ea
                voluptas. Ad quo voluptates nulla, quia nisi animi voluptatum ea
                quidem voluptate ut rerum mollitia distinctio, laborum qui quas
                harum vel, et accusamus veniam porro dicta ipsam dolores
                cupiditate eos! Ullam, neque voluptatem atque distinctio
                deserunt accusantium saepe sapiente aliquid pariatur officia?
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RiderDetails;