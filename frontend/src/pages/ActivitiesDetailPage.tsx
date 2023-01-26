import { OrganisationFilter } from "../components/OrganisationFilterComponent";
import { useNavigate } from "react-router-dom";
import styles from "../css/organisationMoreDetails.module.scss";
import detailStyles from "../css/activitiesDetails.module.scss"
import {
    HiChevronLeft,
    HiOutlineShare,
    HiOutlineLocationMarker,
    HiOutlinePhone,
    HiOutlineMail,
} from "react-icons/hi";
import { MantineProvider, Tabs, Button } from "@mantine/core";
import { sizes } from "@mantine/core/lib/ActionIcon/ActionIcon.styles";
import { Calendar4, GeoAlt, Person, House, Telephone,Envelope } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

export default function OrganisationMoreDetails() {
    const navigate = useNavigate();

    const [choice, setChoice] = useState('basicInfo')
    const click = (value: string) => {
        setChoice(value)
    }
    // console.log(choice == "basicInfo")
    return (
        <MantineProvider
            theme={{
                colors: {
                    ocean: [
                        "#585CE5",
                        "#585CE5",
                        "#585CE5",
                        "#585CE5",
                        "#585CE5",
                        "#585CE5",
                        "#585CE5",
                        "#585CE5",
                        "#585CE5",
                        "#585CE5",
                    ],
                    "milkTea": [
                        "#ECE7DD",
                        "#ECE7DD",
                        "#ECE7DD",
                        "#ECE7DD",
                        "#ECE7DD",
                        "#ECE7DD",
                        "#ECE7DD",
                        "#ECE7DD",
                        "#ECE7DD",
                        "#ECE7DD",
                    ],
                },
            }}
        >
            <div >
                <div className={styles.upperPart}>
                    <div className={styles.chevronAndAdjustmntIcon}>
                        <HiChevronLeft className={styles.chevronIcon} onClick={() => { navigate('/home') }} />
                        <HiOutlineShare className={styles.outlineShare} />
                    </div>

                    <Tabs defaultValue="基本資料" color="ocean" className={styles.tabList}>
                        <Tabs.List className={detailStyles.choices}>
                            <Tabs.Tab value="基本資料" onClick={() => click('basicInfo')}>基本資料</Tabs.Tab>
                            <Tabs.Tab value="時間表" onClick={() => click('schedule')}>時間表</Tabs.Tab>
                            <Tabs.Tab value="徽章" onClick={() => click('badge')}>徽章</Tabs.Tab>
                            <Tabs.Tab value="查詢" onClick={() => click('enquiry')}>查詢</Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </div>

                <div className={detailStyles.lowerPart}>

                    {choice == "basicInfo" ? <div className={detailStyles.basicInfo}>
                        <div className={detailStyles.chanceInstances}>
                            <div className={detailStyles.box}>
                                <img src="photos/carousel-02.png" className={detailStyles.chancePhoto}></img>

                            </div>
                            <div className={detailStyles.organisationName}>香港動物群益會</div>
                            <div className={detailStyles.taskName}>埸內清潔義工</div>
                            <div className={detailStyles.address}>
                                <GeoAlt />&nbsp;&nbsp;&nbsp; 灣仔
                            </div>
                            <div className={detailStyles.dateDetail}><Calendar4 />&nbsp;&nbsp;&nbsp;<span>2013</span>年<span>2</span>月<span>18</span>日&nbsp;&nbsp;（週日）</div>
                        </div>
                    </div> : <div></div>}

                    {choice == "schedule" ? <div className={detailStyles.schedule}>
                        <div className={detailStyles.scheduleWord}></div>
                        <div className={detailStyles.serviceButton}>義工服務</div>
                        <div>
                            <div className={detailStyles.sameDetail}>此環節必須出席全部時段</div>
                            <div className={detailStyles.where}>灣仔</div>
                            <div className={detailStyles.sameDetail}><GeoAlt /> &nbsp;香港灣仔駱克道三號</div>
                            <div className={detailStyles.sameDetail}><Calendar4 /> &nbsp;<span>2023</span>年<span>2</span>月<span>26</span>日&nbsp;（<span>週日</span>）&nbsp; <span>12:00-16:30</span></div>
                        </div>
                    </div> : <div></div>}

                    {choice == "badge" ? <div className={detailStyles.badge}>
                        <p className={detailStyles.badgeWordDetail}>完成此項活動後，將會計算為參與一次的義工服務次數，義工累積達到指定的次數將會得到愛心爆棚者徽章。</p>
                    </div> : <div></div>}

                    {choice == "enquiry" ? <div className={detailStyles.enquiry}>
                        <div className={detailStyles.enquiryWord}><House/>&nbsp;<span>Kenneth</span></div>
                        <div className={detailStyles.enquiryWord}><Telephone/>&nbsp;<span>12345678</span></div>
                        <div className={detailStyles.enquiryWord}><Envelope/>&nbsp;<span>kenneth.chan@gmail.com</span></div>
                    </div> : <div></div>}
                </div>

                <div className={detailStyles.joinPart}>
                    <div className={detailStyles.left}>
                        <div className={detailStyles.personIcon}><Person /></div>
                        <div className={detailStyles.countPart}>
                            <div>剩餘名額<span>2</span></div>
                            <div>（<span>5</span>個名額）</div>
                        </div>
                    </div>
                    <div className={detailStyles.right}>
                        <div className={detailStyles.joinButton}>參加</div>
                    </div>
                </div>

            </div>
        </MantineProvider>
    );
}