import './userInfo.scss';

import React, { useEffect, useState } from 'react';
import MyInput from '../UI/input/MyInput';
import { useParams } from 'react-router-dom';
import UserService from '../../API/UserService';
import { useFetching } from "../../hooks/useFetching";
import MyButton from '../UI/button/MyButton';
import Loader from '../UI/loader/Loader';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UserInfo = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    const [fetchUser, isLoading, error] = useFetching(async (id) => {
        const response = await UserService.getUserById(id);
        setUser(response.data); 
    });
    
    useEffect(() => {
        fetchUser(id);
    }, []);

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const urlRegExp = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
    
    const formik = useFormik({
        initialValues: {
            name: user.name,
            username: user.username,
            email: user.email,
            street: user.address?.street,
            city: user.address?.city,
            zipcode: user.address?.zipcode,
            phone: user.phone,
            website: user.website,
            comment: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                  .min(2)
                  .required(),
            username: Yup.string()
                      .min(2)
                      .required(),
            email: Yup.string()
                   .email()
                   .required(),
            street: Yup.string()
                    .min(2)
                    .required(),
            city: Yup.string()
                  .min(2)
                  .required(),
            zipcode: Yup.string()
                    .min(5)
                    .required(),
            phone: Yup.string().matches(phoneRegExp)
                   .required(),
            website: Yup.string().matches(urlRegExp)
                    .required(),
        }),
        onSubmit: value => {
            const result = JSON.stringify(user, null, 2);
            console.log(result);
            setIsDisabled(true);
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        setUser({
            ...user,
            name: formik.values.name,
            username: formik.values.username,
            email: formik.values.email,
            phone: formik.values.phone,
            website: formik.values.website,
            comment: formik.values.comment,
            address: {...user.address,
                    street: formik.values.street,
                    city: formik.values.city,
                    zipcode: formik.values.zipcode,
            }
            
        })
    }, [formik.values])

    return (
        <div className='user-info'>
            <div className="user-info__title-wrapper">
                <h2 className='user-info__title'>Профиль пользователя</h2>
                <MyButton onClick={() => setIsDisabled(false)}>Редактировать</MyButton>    
            </div>
            {isLoading && user ? <Loader /> :
                <>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="user-info__form">
                            <MyInput disabled={isDisabled}
                                        onBlur={formik.handleBlur}
                                        style={formik.errors.name && formik.touched.name ? {border: '1px solid red'} : null}
                                        onChange={formik.handleChange} 
                                        label='Name' type='text' name="name" value={formik.values.name}/>
                            <MyInput disabled={isDisabled} 
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange} 
                                        style={formik.errors.username && formik.touched.username ? {border: '1px solid red'} : null}
                                        label='User name' type='text' name="username" value={formik.values.username}/>
                            <MyInput disabled={isDisabled}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange} 
                                        style={formik.errors.email && formik.touched.email ? {border: '1px solid red'} : null} 
                                        label='E-mail' type='text' name="email" value={formik.values.email}/>
                            <MyInput disabled={isDisabled} 
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange} 
                                        style={formik.errors.street && formik.touched.street ? {border: '1px solid red'} : null}
                                        label='Street' type='text' name="street" value={formik.values.street}/>
                            <MyInput disabled={isDisabled} 
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange} 
                                        style={formik.errors.city && formik.touched.city ? {border: '1px solid red'} : null}
                                        label='City' type='text' name="city" value={formik.values.city}/>
                            <MyInput disabled={isDisabled} 
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange} 
                                        style={formik.errors.zipcode && formik.touched.zipcode ? {border: '1px solid red'} : null}
                                        label='Zip code' type='text' name="zipcode" value={formik.values.zipcode}/>
                            <MyInput disabled={isDisabled} 
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange} 
                                        style={formik.errors.phone && formik.touched.phone ? {border: '1px solid red'} : null}
                                        label='Phone' type='phone' name="phone" value={formik.values.phone}/>
                            <MyInput disabled={isDisabled} 
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange} 
                                        style={formik.errors.website && formik.touched.website ? {border: '1px solid red'} : null}
                                        label='Website' type='text' name="website" value={formik.values.website}/>
                            <label className='custom-label'>
                                Comment
                                <textarea onChange={formik.handleChange} value={formik.values.comment}
                                disabled={isDisabled} className='custom-input custom-textarea' name="comment" ></textarea>
                            </label>
                        </div>
                        <div className="user-info__btn-wrapper">
                            <MyButton type="submit" disabled={isDisabled} classes="myBtn_green">Отправить</MyButton>    
                        </div>
                    </form>   
                </>
            }
        </div>
    );
};

export default UserInfo;