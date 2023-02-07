import { ChevronLeft, Filter } from "react-bootstrap-icons"
import { FileButton, Group, NativeSelect, NumberInput, Textarea, TextInput } from '@mantine/core'; //https://ui.mantine.dev/category/inputs
import { IconSearch } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
import styles from "../../css/organisation/editActivities.module.scss";
import { Tabs, Button } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import { Input } from '@mantine/core';
import { useForm } from "react-hook-form";

import InputMask from 'react-input-mask';
import { Activity } from "../../components/ActivitiesUtilis";
// import { RiContactsBookLine } from "react-icons/ri";
import { DatePicker } from "@mantine/dates";
import { textSpanContainsPosition } from "typescript";
import { ActivityPreview } from "../../api/activityAPI";
import { act } from "react-dom/test-utils";
import { PetPreview } from "../../api/adoptionAPI";
import { useQuery } from "react-query";
import { fetchJson } from "../../api/utilsAPI";
import { AnimalShow } from "../../components/AnimationSlideShowComponent";




export default function EditAnimals() {
    const navigate = useNavigate();
    const [choice, setChoice] = useState('addAnimals')
    const click = (value: string) => {
        setChoice(value);

    }
    console.log('choice=>', choice)
    const [animal, setAnimal] = useState<PetPreview[]>()
    let animalToBeDisplay = animal;
    console.log("animals to display:", animalToBeDisplay)



    const [weight, setWeight] = useState<number | any>(0.00)
    const { register, watch, handleSubmit } = useForm(

    )
    const [file, setFile] = useState<File | null>(null);
    const resetRef = useRef<() => void>(null);

    const clearFile = () => {
        setFile(null);
        resetRef.current?.();
    };




    const animalName: string = watch("animalName")
    let gender: string = watch("gender")
    const age: string = watch("age")
    const breed: string = watch("breed")
    const remark: string = watch('remark')
    const organsationID: string | null = localStorage.getItem("userId")

    console.log('animalName:', animalName)
    console.log('gender:', gender,)
    console.log('age of animal:', age,)
    console.log('weight:', weight)
    console.log('breed:', breed)
    console.log("remark:", remark,)
    console.log("file:", file)
    const getOrganisationAnimals = async () => {
        const data = await fetchJson<PetPreview[]>(`${process.env.REACT_APP_BACKEND_URL}/editAnimals/getAnimals/${organsationID}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },

            });
        return data;

    }



    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["editAnimals/getAnimals"],
        queryFn: getOrganisationAnimals,
        refetchInterval: 5_000,
        staleTime: 10_000,
        retry: 1,
    });

    console.log('fetched data=>', data!)
    if (data && data !== animal) {
        setAnimal(data)
    }





    const deleteAnimal = async (animalToBeDeleted: PetPreview) => {


        console.log('animal ID to be deleted =>', animalToBeDeleted.pet_id)
        let animalID = animalToBeDeleted.pet_id;
        let organisationID = localStorage.getItem('userId')
        let formBody = {
            animalID: animalID, organisationID: organisationID
        }
        console.log("animalID: ", animalID)
        console.log("organisationID: ", organisationID)

        const resp = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/editAnimals/deleteAnimals`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formBody)
            }
        )

        const data = await resp.json();
        console.log(data.result)
        if (resp.status === 200) {
            // setAnimal(animalToBeDisplay!.filter(singleAnimal => singleAnimal.pet_id !== animalID)); 
            
            animalToBeDisplay?.filter(singleAnimal => singleAnimal.pet_id !== animalID)
            //this is to ensure the data to be deleted is successfully to be "deleted" in the database before it "disappears" in the UI view         
            alert(data.result)
        }
        else {
            alert(data.message)
        }


    }

    const handleSubmitForm = async () => {






        if (!file) {     //stop the submission if no photo is submitted
            alert("請提供圖片")
            return
        }

        if (gender === "male (男)") {
            gender = "male"
        }
        if (gender === "female (女)") {
            gender = "female"
        }

        if (breed === "" || remark === "" || age === "" || parseFloat(weight) <= 0) {
            alert("請填上所有資料")
            return;
        }

        const formData = new FormData()
        formData.append("animalName", animalName.toString());
        formData.append("gender", gender)
        formData.append("weight", weight);
        formData.append("breed", breed)
        formData.append("organisation_id", organsationID!)
        formData.append("file", file || "");
        formData.append("age", age)
        formData.append("remark", remark)

        console.log("organisationID", organsationID)
        console.log('formData', formData)

        let resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}/editAnimals/addAnimals`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData,

            })

        const result = await resp.json();
        if (resp.status === 200) {


            console.log(choice, "first");
            alert(result.message);

            setChoice("deleteAnimals")
            console.log(choice, 'next', result);


        }
    }







    return (
        <>


            <div className={styles.upperPart}>
                <div className={styles.leftArrow}><ChevronLeft className={styles.leftArrowIcon} onClick={() => { navigate("/organisationHomePage") }} /></div>
                <div className={styles.searchBarPart}>

                </div>
            </div>

            <div className={styles.searchChance}>
                編輯流浪動物
            </div>
            <div className={styles.tabList}>
                <Tabs defaultValue="基本資料" color="ocean" >
                    <Tabs.List className={styles.choices}>
                        <Tabs.Tab className={styles.choiceFontSize} value="新增動物" onClick={() => click('addAnimals')}>新增動物</Tabs.Tab>
                        <Tabs.Tab className={styles.choiceFontSize} value="刪除動物" onClick={() => click('deleteAnimals')}>刪除動物</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </div>


            <div className={styles.lowerPart}>
                {choice === "addAnimals" ?

                    <div className={styles.formPart}>
                        <form>
                            <Input.Wrapper id="animalName" label="動物名稱" withAsterisk>
                                <Input id="animalName"
                                    {...register('animalName', { required: true })}
                                />
                            </Input.Wrapper>


                            <NativeSelect
                                data={['male (男)', 'female (女)']}
                                label="性別"
                                radius="md"
                                size="md"
                                withAsterisk
                                id="gender"
                                {...register('gender', { required: true })}
                            />


                            <Input.Wrapper id="age" label="年齡" withAsterisk >
                                <Input id="age"
                                    {...register('age', { required: true })} placeholder="輸入格式為=> 月/年-月/年 months/years old"
                                />
                            </Input.Wrapper>



                            <NumberInput
                                type="number"
                                label="重量 (KG)"
                                // defaultValue={0}
                                precision={2}
                                step={5}
                                id="weight" value={weight} onChange={setWeight} withAsterisk
                            />
                            {(weight <= 0) && (<div className={styles.reminder}>重量必須大於0</div>)}




                            <Input.Wrapper id="breed" label="品種" withAsterisk>
                                <Input id="breed"
                                    {...register('breed', { required: true })} placeholder="如品種不詳請填上 => 不詳"
                                />
                            </Input.Wrapper>







                            <Textarea
                                label="備注："
                                withAsterisk
                                id="remark"
                                {...register('remark', { required: true })
                                } placeholder="如無請填上=> 無"
                            />


                            <div className={styles.uploadImagePart}> <Group position="center">
                                <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
                                    {(props) => <Button {...props} color="violet">Upload image</Button>}
                                </FileButton>
                                <Button disabled={!file} color="red" onClick={clearFile}>Reset</Button>
                            </Group>
                                {file && (
                                    <p>Picked image: {file.name}</p>


                                )}</div>
                            {(!file) && (<div className={styles.reminder}>必須提供圖片</div>)}





                            <div className={styles.confirmation}>
                                <Button size="xl" compact color="violet" onClick={handleSubmitForm}>
                                    確認
                                </Button>
                            </div>

                        </form>
                    </div> :
                    <div>
                       

                        {animalToBeDisplay?.map((eachAnimal) => (
                            <AnimalShow key={eachAnimal.pet_id} pet={eachAnimal} clickHandler={() => navigate(`/adoption/detail?id=${eachAnimal.pet_id}`)} displayDeleteButton={true}
                                onRemove={() => deleteAnimal(eachAnimal)} animalToBeDeleted={eachAnimal.name}
                            />
                        ))
                        }



                    </div>
                }
            </div>
        </>



    )

}
