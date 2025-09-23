import React from "react";
import { Box, Button, FormControlLabel, Radio, Checkbox, RadioGroup, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { DatePicker } from "@mui/x-date-pickers"

const schema = z.object({
    name: z.string().min(3, "Min 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Min 6 characters"),
    gender: z.enum(["Male", "Female"], "Select Gender"),
    categories: z.array(z.string()).min(1, "Select at least 1 category"),
    country: z.string().nonempty("Select a Country"),
    // birthDate: z.date({ invalid_type_error: "Select a valid date" }),
});

type FormValues = z.infer<typeof schema>;

const Form: React.FC = () => {

    console.log("message");
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        mode: "onBlur",
        resolver: zodResolver(schema),
        defaultValues: { name: "", email: "", password: "", gender: "Male", categories: [], country: "" }
    });


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Submitted:", data);

        reset();
    };

    const categoriesList = ["Sports", "Music", "Movies", "Books"];


    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 3,
                p: 3,
                boxShadow: 3,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h4" textAlign="center">
                Form
            </Typography>

            <Controller
                name="name"
                control={control}
                render={({ field }) =>
                    <TextField
                        {...field}
                        label="Name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />}
            />

            <Controller
                name="email"
                control={control}
                render={({ field }) =>
                    <TextField
                        {...field}
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />}
            />

            <Controller
                name="password"
                control={control}
                render={({ field }) =>
                    <TextField
                        {...field}
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />}
            />

            <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                    <RadioGroup {...field} row>
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    </RadioGroup>
                )}
            />
            {errors.gender && <Typography color="error">{errors.gender.message}</Typography>}

            <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                    <Box>
                        {categoriesList.map((cat) => (
                            <FormControlLabel
                                key={cat}
                                control={
                                    <Checkbox
                                        value={cat}
                                        checked={field.value?.includes(cat) || false}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                field.onChange([...(field.value || []), cat]);
                                            } else {
                                                field.onChange(field.value.filter((v: string) => v !== cat));
                                            }
                                        }}
                                    />
                                }
                                label={cat}
                            />
                        ))}
                    </Box>
                )}
            />
            {errors.categories && <Typography color="error">{errors.categories.message}</Typography>}

            <Controller
                name="country"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth>
                        <InputLabel>Country</InputLabel>
                        <Select {...field} label="country">
                            <MenuItem value="India">India</MenuItem>
                            <MenuItem value="USA">USA</MenuItem>
                            <MenuItem value="UK">UK</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />

            {/* <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        label="Birth Date"
                        onChange={(date) => field.onChange(date?.toDate())}
                        value={field.value}
                        slotProps={{ textField: { fullWidth: true, error: !!errors.birthDate, helperText: errors.birthDate?.message } }}
                    />
                )}
            /> */}


            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
};

export default React.memo(Form);
