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
// import { useQuery } from "react-query";
// import { fetchJson } from "../../api/utilsAPI";


interface activityType {
    id: number,
    name: string,
    image: string,
    description: string,
    date: string,
    location: string,
    remaining_place: number,
    organisation_id: number,
    organisation_name: string

}


export default function EditActivities() {
    const navigate = useNavigate();
    const [choice, setChoice] = useState('addActivities')
    const click = (value: string) => {
        setChoice(value);

    }
    console.log(choice)
    const [activity, setActivity] = useState<ActivityPreview[]>()
    console.log(activity);
    // console.log(typeof activity)
    const [date, setDate] = useState<Date | any>(new Date())

    let year = date.getFullYear();

    let extractMonth = date.getMonth() + 1;
    let month;
    if (extractMonth < 10) {
        month = "0" + extractMonth;
    } else { month = extractMonth; }



    let extractDateOfActivity = date.getDate();
    let dateOfActivity;
    if (extractDateOfActivity < 10) {
        dateOfActivity = "0" + extractDateOfActivity
    } else {
        dateOfActivity = extractDateOfActivity
    }

    let stringOfDate = year + "/" + month + "/" + dateOfActivity



    const [fee, setFee] = useState<number | any>(0.00)
    const { register, watch, handleSubmit } = useForm(

    )
    const [file, setFile] = useState<File | null>(null);
    const resetRef = useRef<() => void>(null);

    const clearFile = () => {
        setFile(null);
        resetRef.current?.();
    };




    const activityName: string = watch("activitiyName")
    const activityDetails: string = watch("activityDetails")
    const activityStartTime: string = watch("activityStartTime")
    const activityEndTime: string = watch("activityEndTime")
    const requirements: string = watch("requirements")
    let district: string = watch("district")
    const address: string = watch("address")
    const count: number = watch("count")
    // console.log(district)
    const organsationID: string | null = localStorage.getItem("userId")


    let activityStartTimeforFetch = year + "/" + month + "/" + dateOfActivity + " " + activityStartTime

    let activityEndTimeforFetch = year + "/" + month + "/" + dateOfActivity + " " + activityEndTime


    // const getOrganisationActivities=async ()=>{
    //     const data=await fetchJson( `${process.env.REACT_APP_BACKEND_URL}/editActivities/getActivities`,
    //     {
    //         method: 'POST',
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(formBody)
    //     });
    //     return data;
    //     console.log(data)
    // }



    // const { isLoading, isError, data, error } = useQuery({
    //     queryKey: ["editActivities/getActivities"],
    //     queryFn: getOrganisationActivities,
    //     refetchInterval: 5_000,
    //     staleTime: 10_000,
    //     retry: 1,
    //   });



    useEffect(() => {
        let formBody = { 'organisationId': organsationID! };
        const fetchData = async () => {
            const resp = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/editActivities/getActivities`,
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
            if (resp.status === 200) {
                console.log(data.result)
                setActivity(data.result)
            }
            else { alert(data.message) }
        }

        fetchData();

    }, [])


    const deleteActivity = async (activityToBeDeleted: ActivityPreview) => {


        console.log(activityToBeDeleted)
        let activityID = activityToBeDeleted.activity_id;
        let organisationID = localStorage.getItem('userId')
        let formBody = {
            activityID: activityID, organisationID: organisationID
        }
        setActivity(activity!.filter(singleActivity =>  singleActivity.activity_id !== activityID ))

        // console.log(formBody)
        const resp = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/editActivities/deleteActivities`,
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


    }

    const handleSubmitForm = async () => {

        console.log("hi")

        if ((parseInt(activityStartTime.slice(0, 2)) > 23 || parseInt(activityStartTime.slice(3, 5)) > 59 || (activityStartTime[0] === '_') || (activityStartTime[1] === '_') || (activityStartTime[3] === '_') || (activityStartTime[4] === '_') || parseInt(activityEndTime.slice(0, 2)) > 23 || parseInt((activityEndTime.slice(3, 5))) > 59 || (activityEndTime[0] === '_') || (activityEndTime[1] === '_') || (activityEndTime[3] === '_') || (activityEndTime[4] === '_'))) {
            alert("請填上正確開始時間")
            return;
        }


        if (!file) {     //stop the submission if no photo is submitted
            alert("請提供圖片")
            return
        }

        if (district === "九龍") {
            district = "kowloon"
        }
        if (district === "香港島") {
            district = "hong_kong_island"
        }
        if (district === "新界") {
            district = "new_territories"
        }

        const formData = new FormData()
        formData.append("activityName", activityName.toString());
        formData.append("activityDetails", activityDetails)
        formData.append("date", stringOfDate)
        formData.append("activityStartTime", activityStartTimeforFetch)
        formData.append("activityEndTime", activityEndTimeforFetch)
        formData.append("requirements", requirements)
        formData.append("district", district);
        formData.append("address", address)
        formData.append("count", count.toString())
        formData.append("remaining_place", count.toString())
        formData.append("fee", fee)
        formData.append("organisation_id", organsationID!)
        formData.append("file", file || "");
        formData.append("type", "editors_choice")
        console.log(organsationID)

        let resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}/editActivities/addActivities`,
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

            setChoice("deleteActivities")
            console.log(choice, 'next', result);


        }
    }







    return (
        <>


            <div className={styles.upperPart}>
                <div className={styles.leftArrow}><ChevronLeft className={styles.leftArrowIcon} onClick={() => { navigate("/organisationHomePage") }} /></div>
                <div className={styles.searchBarPart}>
                    <TextInput className={styles.searchBar}
                        icon={<IconSearch size={30} stroke={1.5} className={styles.iconSearch} />}
                        radius="xl"
                        size="xl"
                        placeholder="尋找關鍵字"
                        rightSectionWidth={42}
                    />
                </div>
                <div className={styles.filter}><Filter className={styles.filterIcon} /></div>
            </div>

            <div className={styles.searchChance}>
                活動編輯
            </div>
            <div className={styles.tabList}>
                <Tabs defaultValue="基本資料" color="ocean" >
                    <Tabs.List className={styles.choices}>
                        <Tabs.Tab value="新增活動" onClick={() => click('addActivities')}>新增活動</Tabs.Tab>
                        <Tabs.Tab value="刪除活動" onClick={() => click('deleteActivities')}>刪除活動</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </div>


            <div className={styles.lowerPart}>
                {choice === "addActivities" ?

                    <div className={styles.formPart}>
                        <form>
                            <Input.Wrapper id="activitiyName" label="活動名稱" withAsterisk>
                                <Input id="activitiyName"
                                    {...register('activitiyName', { required: true })}
                                />
                            </Input.Wrapper>


                            <Textarea
                                label="活動內容"
                                withAsterisk
                                id="activityDetails"
                                {...register('activityDetails', { required: true })}
                            />



                            <DatePicker label="活動日期" placeholder="按此選擇日期" required value={date} onChange={setDate} />




                            <Input.Wrapper id="activityStartTime" label="活動開始時間" required>
                                <Input component={InputMask} mask="99:99" id="activityStartTime" {...register('activityStartTime', { required: true })} />
                            </Input.Wrapper>
                            {(!activityStartTime) && (<div className={styles.reminder}>請以24小時制（如：23:59）填上</div>)}
                            {((activityStartTime) && (parseInt(activityStartTime.slice(0, 2)) > 23 || parseInt((activityStartTime.slice(3, 5))) > 59 || (activityStartTime[0] === '_') || (activityStartTime[1] === '_') || (activityStartTime[3] === '_') || (activityStartTime[4] === '_'))) && (<div className={styles.reminder}>請填上正確時間</div>)}

                            <Input.Wrapper id="activityEndTime" label="活動結束時間" required>
                                <Input component={InputMask} mask="99:99" id="activityEndTime" {...register('activityEndTime', { required: true })} />
                            </Input.Wrapper>
                            {(!activityEndTime) && (<div className={styles.reminder}>請以24小時制（如：23:59）填上</div>)}

                            {((activityEndTime) && (parseInt(activityEndTime.slice(0, 2)) > 23 || (parseInt(activityEndTime.slice(3, 5))) > 59 || (activityEndTime[0] === '_') || (activityEndTime[1] === '_') || (activityEndTime[3] === '_') || (activityEndTime[4] === '_'))) && (<div className={styles.reminder}>請填上正確時間</div>)}

                            <Textarea
                                label="參加要求"
                                withAsterisk
                                id="requirements"
                                {...register('requirements', { required: true })}
                            />

                            <NativeSelect
                                data={['九龍', '香港島', '新界']}
                                label="舉辦地區"
                                radius="md"
                                size="md"
                                withAsterisk
                                id="district"
                                {...register('district', { required: true })}
                            />

                            <Textarea
                                label="舉辦地址"
                                withAsterisk
                                id="address"
                                {...register('address', { required: true })}
                            />

                            <Input.Wrapper id="count" label="活動名額" required>
                                <Input type="number" id="count" {...register('count', { required: true })} min="1" />
                            </Input.Wrapper>
                            {((count) && (count <= 0)) && (<div className={styles.reminder}>名額必須多於0人</div>)}



                            <NumberInput
                                type="number"
                                label="活動費用 (HKD)"
                                // defaultValue={0}
                                precision={2}
                                step={10}
                                id="fee" value={fee} onChange={setFee}
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


                        {activity?.map((activity) => (
                            <Activity key={activity.activity_id} activity={activity} clickHandler={() => navigate(`/activity/detail?id=${activity.activity_id}`)} displayDeleteButton={true} onRemove={() => deleteActivity(activity)} activityToBeDeleted={activity.activity} />
                        ))
                        }



                    </div>
                }
            </div>
        </>



    )

}
