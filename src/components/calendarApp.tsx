import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase';
import Navbar from './navbar';
import { Calendar,  momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ThemeProvider } from '@emotion/react';
import {createTheme} from '@mui/material/styles'
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

type calendarProps = {
    
};

type eventForm = {
    title: string,
    date: Date,
    duration: number
}

type customEvent = {
    title: string,
    start: Date,
    end: Date,
    id: string
}

const calendarApp:React.FC<calendarProps> = () => {
    const [user] = useAuthState(auth)
    const [events, setEvents] = useState([] as customEvent[])
    const [form, setForm] = useState({
        title: '',
        date: new Date(0),
        duration: 45
    } as eventForm)
    const inputRef = useRef<HTMLLabelElement>(null)
    const localizer = momentLocalizer(moment)

    const handleClose = useCallback(() => inputRef.current?.click(), [])
    const getEvents = async () => {
        if (user){
        const querySnapshot = await getDocs(collection(firestore, "users", user.uid, "events"))
        querySnapshot.forEach((doc) => {
            const data = {
                title: doc.data().title,
                start: new Date(doc.data().start),
                end: new Date(doc.data().end),
                id: doc.data().id
            }

            setEvents((prev) => [...prev, data])
        })

        }           
    }

    useEffect(() => {
        getEvents()
    }, [user])

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
    };

    const onDateChange = (date: Date) => {
        setForm((prev) => ({
            ...prev,
            date: date,
          }));
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const endDate = new Date(form.date.getTime() + form.duration*60000)

        const calEvent: customEvent = {
            title: form.title,
            start: form.date,
            end: endDate,
            id: uuidv4()
        }

        try{
            if(user){
                const eventRef = doc(firestore, "users", user?.uid, "events", calEvent.id)
                await setDoc(eventRef, JSON.parse(JSON.stringify(calEvent)))
            }
        } catch (e) {
            console.log(e)
            return
        }

        setEvents((prev) => ([...prev, calEvent]))
    }

    const deleteEvent = async (event: customEvent) => {
        console.log(event)
        const index = events.findIndex(item => item.id === event.id);
        if (index !== -1) {
            try{
                if(user){
                    await deleteDoc(doc(firestore, "users", user?.uid, "events", event.id))
                } else {
                    throw new Error("No User")
                }
            } catch (e) {
                console.log(e)
                return
            }
      
          const newEvents = [...events.slice(0, index), ...events.slice(index + 1)];
      
          setEvents(newEvents);
      
        }
    }

    const theme = createTheme(
        {
            palette: {
                mode: 'dark',
                primary: {
                  main: '#3f51b5',
                },
                secondary: {
                  main: '#f50057',
                },
              },
        }
    )
    return (
        <>
        <Navbar/>
        <div className='flex md:justify-end lg:justify-end justify-center md:mb-[-17px] lg:mb-[-16px]'>
        <label htmlFor="my_modal_6" className="btn btn-primary p-2 btn-sm md:mr-[200px] lg:mr-[200px] md:mb-[-31px] lg:mb-[-150px] z-10">Add Appointment</label>
        </div>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box">
            <form onSubmit={onSubmit}>
            <h3 className="font-bold text-lg">Add Appointment</h3>
            <p className="py-4 pb-2">Title</p>
            <input required onChange={onChange} name='title' type="text" placeholder="Title" className="input input-bordered w-full max-w-xs" />
            <p className="py-4 pb-2">Appointment Date</p>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <ThemeProvider theme={theme}>
                    <DateTimePicker name='date' onChange={(newValue) => onDateChange(newValue!.toDate())} sx={{color:'#ffffff', borderColor: 'white'}} className='border-white'/>
                </ThemeProvider>
            </LocalizationProvider>
            <p className="py-4 pb-2">Duration</p>
            <div className='flex w-full justify-between'>
                <div className='w-[84%]'>
                <input required onChange={onChange} name='duration' type="range" min={15} max="120" className="range" step="15" />
                <div className="w-full flex justify-between text-xs px-2">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
                </div>
                <p className='p-2 text-lg font-bold'>{form.duration}m</p>
            </div>

            <div className="modal-action">
                <button type="submit" onClick={handleClose} className='btn btn-primary'>Add Event!</button>
                <label ref={inputRef} htmlFor="my_modal_6" className="btn">Close</label>
            </div>
            </form>
        </div>
        </div>
        <div className='h-[84vh] m-4 border-0 border-red-500'>
        <Calendar 
            localizer={localizer}  
            events={events}
            views={['month', 'week',]}
            onSelectEvent={(e) => deleteEvent(e)}
        />
        </div>
        </>
    )
}
export default calendarApp;