import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Hero, HeroEditModel, Power } from '../models';
import { Button } from './Button';
import { InputField } from './InputField';
import { SelectField } from './SelectField';

interface HeroFormProps {
  hero?: Hero;
  powers: Power[];
  onSave: (hero: HeroEditModel, file?: File) => void;
}

type HeroFormData = {
  name: string;
  fans: number;
  saves: number;
  price: number;
  powers: number[];
};

const HeroForm: React.FC<HeroFormProps> = ({ hero, powers, onSave }) => {
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();

  const {
    register,
    handleSubmit: handleReactHookFormSubmit,
    formState,
  } = useForm<HeroFormData>();

  const handleSubmit = handleReactHookFormSubmit((heroFormData) => {
    const newHero: HeroEditModel = {
      id: hero?.id,
      name: heroFormData.name,
      price: heroFormData.price,
      fans: heroFormData.fans,
      saves: heroFormData.saves,
      powers: heroFormData.powers.map(x => Number(x)),
    };
    onSave(newHero, file);
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files![0];
    if (newFile) {
      setFile(newFile);
      const reader = new FileReader();
      reader.readAsDataURL(newFile);
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
    }
  };

  return (
    <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <InputField
        label="Name"
        defaultValue={hero?.name}
        type="text"
        data-cy="nameInput"
        errorMessage={formState.errors.name?.message as string}
        {...register('name', {
          required: 'Name is required',
          
        })}
      />
      <InputField
        label="Price"
        defaultValue={hero?.price}
        type="number"
        data-cy="priceInput"
        errorMessage={formState.errors.price?.message as string}
        {...register('price', {
          required: 'Price is required',
          valueAsNumber: true,
        })}
      />
      <InputField
        label="Fans"
        defaultValue={hero?.fans}
        type="number"
        data-cy="fansInput"
        errorMessage={formState.errors.fans?.message as string}
        {...register('fans', {
          required: 'Fans is required',
          valueAsNumber: true,
        })}
      />
      <InputField
        label="Saves"
        defaultValue={hero?.saves}
        type="number"
        data-cy="savesInput"
        errorMessage={formState.errors.saves?.message as string}
        {...register('saves', {
          required: 'Saves is required',
          valueAsNumber: true,
        })}
      />

      <SelectField
        defaultValue={hero?.powers.map((i) => i.id.toString())}
        label="Powers"
        multiple
        size={6}
        data-cy="powersSelect"
        errorMessage={formState.errors.powers?.message as string}
        {...register('powers', {
          required: 'Powers is required',
          valueAsNumber: true,
        })}
      >
        {powers.map((power, i) => (
          <option value={power.id} key={i}>
            {power.name}
          </option>
        ))}
      </SelectField>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-500">
          Avatar
        </label>
        <div className="border border-dashed border-gray-500 relative block max-w-sm">
          <input
            accept="image/*"
            type="file"
            id="avatar"
            data-cy="avatarFile"
            className="cursor-pointer absolute block opacity-0 top-0 right-0 left-0 z-50 w-full h-full"
            onChange={handleFileChange}
          />
          {imageUrl ? (
            <img src={imageUrl} />
          ) : (
            <div className="text-center p-10 w-full h-full">
              <h4>
                Drop image here
                <br />
                or
              </h4>
              <p className="">Select image</p>
            </div>
          )}
        </div>
      </div>
      <Button className="max-w-[100px]">Submit</Button>
    </form>
  );
};

export default HeroForm;
