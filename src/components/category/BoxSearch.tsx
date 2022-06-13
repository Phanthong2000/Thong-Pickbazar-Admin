import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { allGroupsSelector } from '../../redux/slices/groupSlice';

type Props = {
    handleFilter: (value: any, text: string) => void
}
function BoxSearch({ handleFilter }: Props) {
    const groups = useSelector(allGroupsSelector);
    const [options, setOptions] = useState<any[]>([]);
    const [text, setText] = useState<string>('');
    const [value, setValue] = useState<any>(null)
    useEffect(() => {
        if (groups) {
            const data: any[] = [];
            groups.forEach((group: any) => {
                data.push({
                    value: group.name_en,
                    label: group.name_en
                })
            });
            setOptions(data)
        }
    }, [groups])
    return (
        <div className='d-flex align-items-center row box_shadow_card bg_white p-4 border_radius_3'>
            <div className='col-12 col-lg-2 font_family_bold font20'>Categories</div>
            <div className='mt-md-2 mt-lg-0 col-12 col-lg-10 d-flex align-items-center justify-content-end'>
                <div className='row w100_per'>
                    <div className='col-12 col-lg-4 px-2'>
                        <input value={text} onChange={(e) => {
                            handleFilter(value, e.target.value)
                            setText(e.target.value)
                        }} placeholder='Type your query and press enter' className='h40_px mr_10px w100_per' type="text" />
                    </div>
                    <div className='col-12 col-lg-4'>
                        <Select
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    height: '40px'
                                })
                            }}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#ddd',
                                    primary50: "#ddd",
                                    primary: 'rgba(0,159,127)',
                                },
                            })}
                            isClearable
                            placeholder="Filter by group" onChange={(value) => {
                                handleFilter(value, text)
                                setValue(value)
                            }} options={options} />
                    </div>
                    <div className='col-12 col-lg-4 d-flex justify-content-end mt-lg-0 mt-md-2 px-2'>
                        <Link to="/categories/create">
                            <button className='btn bg_primary color_white font12 font_family_bold h40_px'>+ Add Categories</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BoxSearch)