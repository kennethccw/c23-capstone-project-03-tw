import { ChevronLeft, Filter } from "react-bootstrap-icons"
import { FileButton, FileInput, Group, NativeSelect, NumberInput, Textarea, TextInput } from '@mantine/core'; //https://ui.mantine.dev/category/inputs
import { IconSearch } from '@tabler/icons';
import { useNavigate } from "react-router-dom";
import styles from "../../css/organisation/editActivities.module.scss";
import { MantineProvider, Tabs, Button } from "@mantine/core";
import { useRef, useState } from "react";

import { Input } from '@mantine/core';
import { useForm } from "react-hook-form";

import InputMask from 'react-input-mask';
import { Activity } from "../../components/ActivitiesUtilis";
import { RiContactsBookLine } from "react-icons/ri";
import { DatePicker } from "@mantine/dates";

export default function EditActivities() {
    const navigate = useNavigate();
    const [choice, setChoice] = useState('addActivities')
    const click = (value: string) => {
        setChoice(value);

    }

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
    const [file, setFile] = useState<File |null>(null);
    const resetRef = useRef<() => void>(null);

    const clearFile = () => {
        setFile(null);
        resetRef.current?.();
    };


    const activityName = watch("activitiyName")
    const activityDetails = watch("activityDetails")
    const activityStartTime = watch("activityStartTime")
    const activityEndTime = watch("activityEndTime")
    const requirements = watch("requirements")
    const district = watch("district")
    const address = watch("address")
    const count = watch("count")
console.log(activityName)
    const [isLoading, setIsLoading] = useState(false);
    
    let activityStartTimeforFetch= year + "/" + month + "/" + dateOfActivity+" "+activityStartTime

let activityEndTimeforFetch= year + "/" + month + "/" + dateOfActivity+" "+activityEndTime

let notFillInActivityName=false;
    return (<>

        <div className={styles.upperPart}>
            <div className={styles.leftArrow}><ChevronLeft className={styles.leftArrowIcon} onClick={() => { navigate('/') }} /></div>
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
        <Tabs defaultValue="基本資料" color="ocean" className={styles.tabList}>
            <Tabs.List className={styles.choices}>
                <Tabs.Tab value="新增活動" onClick={() => click('addActivities')}>新增活動</Tabs.Tab>
                <Tabs.Tab value="刪除活動" onClick={() => click('deleteActivities')}>刪除活動</Tabs.Tab>
            </Tabs.List>
        </Tabs>

        <div className={styles.lowerPart}>
            {choice == "addActivities" ?

                <div>
                    <form onSubmit={handleSubmit(async (e) => {
                        e.preventDefault();
                    // if(!activityName || activityName===""||!activityDetails ||activityDetails===""||activityStartTime.slice(0, 2) > 23 || (activityStartTime.slice(3, 5)) > 59 || (activityStartTime[0] === '_') || (activityStartTime[1] === '_') || (activityStartTime[3] === '_') || (activityStartTime[4] === '_')){
                    //     alert("請填寫所需資料");
                    //     return;}
                    console.log(activityName)
                    if(activityName===""){
                       notFillInActivityName=true;
                        return;
                    }
                   console.log(notFillInActivityName)




                        const formData = new FormData()
                        formData.append("activityName", activityName)
                        formData.append("activityDetails",activityDetails)
                        formData.append("date",stringOfDate)
                        formData.append("activityStartTime",activityStartTimeforFetch)
                        formData.append("activityEndTime",activityEndTimeforFetch)
                        formData.append("requirements",requirements)
                        formData.append("district",district)
                        formData.append("address",address)
                        formData.append("count",count)
                        formData.append("remaining_place",count)
                        formData.append("fee",fee)
                        formData.append("organisation_id","1")
                        formData.append("file",file||"")
                        formData.append("type","editors_choice")
                       
                  console.log(file)
                  console.log(file!.name)
                        console.log(formData)
                        await fetch(`${process.env.REACT_APP_BACKEND_URL}/editActivities/addActivities`,
                            {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },
                                body: JSON.stringify(formData),

                            })


                    })}>
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


                        {/* <DatePicker placeholder="Pick date" label="活動日期" withAsterisk id="activityDate" {...register('activityDate')}/> */}
                        <DatePicker label="活動日期" placeholder="按此選擇日期" required value={date} onChange={setDate} />




                        <Input.Wrapper id="activityStartTime" label="活動開始時間" required>
                            <Input component={InputMask} mask="99:99" id="activityStartTime" {...register('activityStartTime', { required: true })} />
                        </Input.Wrapper>
                        {(!activityStartTime) && (<div className={styles.reminder}>請以24小時制（如：23:59）填上</div>)}
                        {((activityStartTime) && (activityStartTime.slice(0, 2) > 23 || (activityStartTime.slice(3, 5)) > 59 || (activityStartTime[0] == '_') || (activityStartTime[1] == '_') || (activityStartTime[3] == '_') || (activityStartTime[4] == '_'))) && (<div className={styles.reminder}>請填上正確時間</div>)}

                        <Input.Wrapper id="activityEndTime" label="活動結束時間" required>
                            <Input component={InputMask} mask="99:99" id="activityEndTime" {...register('activityEndTime', { required: true })} />
                        </Input.Wrapper>
                        {(!activityEndTime) && (<div className={styles.reminder}>請以24小時制（如：23:59）填上</div>)}

                        {((activityEndTime) && (activityEndTime.slice(0, 2) > 23 || (activityEndTime.slice(3, 5)) > 59 || (activityEndTime[0] == '_') || (activityEndTime[1] == '_') || (activityEndTime[3] == '_') || (activityEndTime[4] == '_'))) && (<div className={styles.reminder}>請填上正確時間</div>)}

                        <Textarea
                            label="參加要求"
                            withAsterisk
                            id="requirements"
                            {...register('requirements', { required: true })}
                        />

                        <NativeSelect
                            data={['kowloon', 'hong_kong_island', 'new_territories']}
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
                            <Input id="count" {...register('count', { required: true })} min="1" />
                        </Input.Wrapper>
                        {((count) && (count <= 0)) && (<div className={styles.reminder}>名額必須多於0人</div>)}


                        <NumberInput
                            label="活動費用 (HKD)"
                            // defaultValue={0}
                            precision={2}
                            step={10}
                            id="fee" value={fee} onChange={setFee}
                        />


                        <div className={styles.uploadImagePart}> <Group position="center">
                            <FileButton resetRef={resetRef} onChange={ (file) =>setFile(file)} accept="image/png,image/jpeg">
                                {(props) => <Button {...props} color="violet">Upload image</Button>}
                            </FileButton>
                            <Button disabled={!file} color="red" onClick={clearFile}>Reset</Button>
                        </Group>
                            {file && (
                                <p>Picked image: {file.name}</p>


                            )}</div>


                        <div className={styles.confirmation}>
                            <Button size="xl" compact color="violet" type="submit">
                                確認
                            </Button>
                        </div>

                    </form>
                </div> : <div></div>}




            {choice == "deleteActivities" ? <div>
                <Activity />
            </div> : <div></div>}
        </div>


    </>)

}
