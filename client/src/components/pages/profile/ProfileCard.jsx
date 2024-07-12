import { useForm } from 'react-hook-form';
import FormRow from '../../Form/FormRow';
import SubmitButton from '../../Buttons/SubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateProfileSchema } from '../../../schemas/UpdateProfileSchema';
import { updateProfile } from '../../../queries/users/profile';
import { addUserToLocalStorage } from '../../../utils/localStorage';
import { useState } from 'react';

const ProfileCard = (user) => {
    const [userData, setUserData] = useState(user);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user.user.name,
            email: user.user.email,
        },
        resolver: yupResolver(UpdateProfileSchema),
    });

    const handlerUpdateProfile = async (profile) => {

        await updateProfile(profile);

        const updatedUser = {
            name: profile.name,
            email: profile.email,
            id: user.user.id,
            role: user.user.role,
        };
        console.log(user.user);
        console.log(updatedUser);
        addUserToLocalStorage(updatedUser);
    };

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit(handlerUpdateProfile)}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <FormRow
                        type="text"
                        name="name"
                        labelText="Name"
                        placeholder="Nome"
                        control={control}
                        hasError={JSON.stringify(errors.name?.message)}
                    />
                    <FormRow
                        type="email"
                        name="email"
                        labelText="E-mail"
                        placeholder="teste@texte.com.br"
                        control={control}
                        hasError={JSON.stringify(errors.email?.message)}
                    />
                </div>
                <div className="relative inline-flex items-center justify-center">
                    <SubmitButton label="Enviar" />
                </div>
            </form>
        </div>
    );
};

export default ProfileCard;