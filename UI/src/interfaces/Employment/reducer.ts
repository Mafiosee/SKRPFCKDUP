import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { JobType, Works } from '../../shared/Employment/types'
import { WorkStatus } from '../../shared/Work/Work'

type ModalState = {
	isOpen: boolean;
	jobs: JobType[];
};

const initialState: ModalState = {
	isOpen: false,
	jobs: [
		// {
		//   id: 0,
		//   lvl: 1,
		//   image: Works.MilkFarm,
		//   name: "Молочная ферма",
		//   salary: 150,
		//   status: WorkStatus.Available,
		//   description:
		//     "Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами.",
		// },
		// {
		//   id: 1,
		//   lvl: 2,
		//   image: Works.WoodFarm,
		//   name: "Рубильщик дров2",
		//   salary: 250,
		//   status: WorkStatus.Working,
		//   description:
		//     "Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами.",
		// },
		// {
		//   id: 3,
		//   lvl: 2,
		//   image: Works.WoodFarm,
		//   name: "Рубильщик дров2",
		//   salary: 250,
		//   status: WorkStatus.Unavailable,
		//   description:
		//     "Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами, и выполнены в серых и синих тонах. Все элементы одежды имеют уникальный дизайн, вдохновленный крысами.",
		// },
	],
}

export const employmentSlice = createSlice({
	name: 'employment',
	initialState,
	reducers: {
		show(state) {
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setJobs(state, action: PayloadAction<JobType[]>) {
			state.jobs = action.payload
		},
		updateJobById(state, action: PayloadAction<{ jobId: any; job: JobType }>) {
			const payload = action.payload

			if (state.jobs === undefined) {
				return state
			}

			const index = state.jobs.findIndex((job) => job.id === payload.jobId)

			if (index !== -1) {
				state.jobs[index] = payload.job
			}

			return state
		},
	},
})

export const employmentReducer = employmentSlice.reducer
export const employmentActions = employmentSlice.actions
