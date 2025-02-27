import { Race } from '../Race/type'
import { Gender } from './enums/Genders'
import { Parts } from './enums/Parts'

type TintWithoutColor = {
	texturePath: string
	type: number
}

type CharacterData = {
	[Parts.Body]: {
		skinColors: number[]
		weights: number[]
	}
	[Parts.Head]: {
		dirtTints: TintWithoutColor[]
		dirtColors: number[]
		faceScars: number[]
	}
	[Parts.Face]: {
		noseTypes: number[]
		noseLengths: number[]
		noseHeights: number[]
		jawWidths: number[]
		jawHeights: number[]
		cheekboneHeights: number[]
		cheekboneWidths: number[]
		cheeksTints: number[]
		cheeksTintLowers: number[]
		frownLiness: number[]
		noseTints: number[]
		chinTints: number[]
		neckTints: number[]
		foreHeadTints: number[]
	}
	[Parts.Hair]: {
		hairs: number[]
		facialHairs: number[] | null
		hairColors: number[]
	}
	[Parts.Eyes]: {
		eyesForms: number[]
		eyesColors: number[]
		eyesHeigths: number[]
		eyesDistances: number[]
		eyesDepths: number[]
		eyesLinerColors: number[]
		eyesUpperShadows: number[]
		eyesLowerShadows: number[]
	}
	[Parts.Eyebrows]: {
		eyebrowsTypes: number[] | null
		eyebrowsHeigths: number[]
		eyebrowsWeights: number[]
		eyebrowsForwards: number[]
	}
	[Parts.Mouth]: {
		lipsTypes: number[]
		lipsHeigths: number[]
		lipsForwards: number[]
		chinWeigths: number[]
		chinLengths: number[]
		chinForwards: number[]
		lipsColors: number[]
	}
	[Parts.Clothes]: {
		top: number[]
		shoes: number[]
	}
	presetIndexes: number[]
}

export type CharacterDto = {
	raceId: Race
	[Gender.Male]: CharacterData
	[Gender.Female]: CharacterData
}

export const characterConfig: CharacterDto[] = [
	{
		raceId: Race.Argonian,
		[Gender.Male]: {
			[Parts.Body]: {
				skinColors: [
					0x51fdfdfd, 0x7af1e75c, 0x7f808000, 0x00ffffff, 0x6b4a8945, 0xa8364e21, 0x7f212b52, 0x770f0440, 0xafe2acf0, 0x72a95452,
					0xc9956440, 0x6b563112, 0xa5430401, 0xc62f2013,
				],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\argoniandirt.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [733141, 733125, 733124, 733126, 733127, 733129, 733146, 733147, 733148, 733149, 733254],
			},
			[Parts.Face]: {
				noseTypes: [0, 1, 2, 3, 4, 5, 6],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				cheeksTintLowers: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				frownLiness: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				noseTints: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				chinTints: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				neckTints: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				foreHeadTints: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
			},
			[Parts.Hair]: {
				hairs: [885497, 865098, 865099, 865100, 865101, 865102, 865103, 865104, 865105, 865106, 865107],
				facialHairs: null,
				hairColors: [
					0xff460000, 0xff46581d, 0xff2c266f, 0xff9a8301, 0xffa0a0a0, 0xff284868, 0xff353e17, 0xff60260b, 0xff814a14, 0xff241d17,
					0xff513315, 0xff1b2330, 0xff254120, 0xff93823c, 0xff8a5c3c, 0xff683a15,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [0, 1, 2, 3, 4, 5, 6],
				eyesColors: [333066, 644602, 644621, 644623, 644649, 644798, 644937, 644939, 644940, 644956, 644962],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				eyesUpperShadows: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				eyesLowerShadows: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [885496, 733130, 733131],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [0, 1, 2, 3, 4, 5, 6],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		[Gender.Female]: {
			[Parts.Body]: {
				skinColors: [
					0x00ffffff, 0x6b563112, 0xc62f2013, 0x7af1e75c, 0x9b807000, 0x6b4a8945, 0xa8364e21, 0x7f213152, 0x770f0440, 0xafe2acf0,
					0x72a95452, 0xc9956440, 0xa5430401,
				],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\argoniandirt.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [733140, 733112, 732696, 732697, 732701, 732702, 732767, 732910, 733109, 733110, 733111],
			},
			[Parts.Face]: {
				noseTypes: [0, 1, 2, 3, 4, 5, 6],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				cheeksTintLowers: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				frownLiness: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				noseTints: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				chinTints: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				neckTints: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				foreHeadTints: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
			},
			[Parts.Hair]: {
				hairs: [885495, 865088, 865089, 865090, 865091, 865092, 865093, 865094, 865095, 865096, 865097, 923197, 666870, 733428],
				facialHairs: null,
				hairColors: [0xff46581d, 0xff9a8301, 0xffa0a0a0, 0xff814a14, 0xff241717, 0xff513315, 0xff93823c, 0xff8a5c3c, 0xff683a15],
			},
			[Parts.Eyes]: {
				eyesForms: [0, 1, 2, 3, 4, 5, 6],
				eyesColors: [599308, 667006, 667012, 667013, 667311, 667312, 667351, 667314, 667411, 667412],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				eyesUpperShadows: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
				eyesLowerShadows: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [885494, 733132, 733137],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [0, 1, 2, 3, 4, 5, 6],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [
					0x00ffffff, 0xfffdfdfd, 0xff430401, 0xd3d50000, 0xffd26900, 0xfff1e75c, 0xff4a8945, 0xff364e21, 0xd16262ff, 0xff563112,
					0xff2f2013, 0xaf110e06,
				],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
	},
	{
		raceId: Race.Breton,
		[Gender.Male]: {
			[Parts.Body]: {
				skinColors: [0xffb79c91, 0xffa7867a, 0xff826d5b, 0xff706156, 0xff615349, 0xff5c4332, 0xff573d33, 0xff523d30, 0xff5c3d36],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [651425, 651426, 937386, 937516, 937427, 937515, 937495, 937496, 937497, 937514, 937513, 937512],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0xff000000, 0xff2f2013],
				cheeksTintLowers: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0xff000000, 0xff2f2013],
				frownLiness: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901],
				noseTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				chinTints: [0x00ffffff, 0x6b430401, 0x7f500901, 0x59212b52, 0xff2f2013],
				neckTints: [0x00ffffff, 0x6b430401, 0x7f500901, 0x59212b52, 0xff2f2013],
				foreHeadTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					332805, 630112, 630140, 630141, 630142, 630143, 630144, 333063, 333013, 332984, 332887, 332822, 332818, 332816, 332808, 332806,
					332814, 332812, 332810, 916272, 916480, 916481, 916482, 916483, 916484, 916485, 916486, 332803, 332799,
				],
				facialHairs: [
					95497, 1003529, 331957, 331956, 563633, 95493, 95494, 95496, 802016, 802018, 802020, 802014, 802012, 802010, 802004, 802006,
					802008, 801990, 801992, 801994, 801998, 802000, 802002, 863936, 863938, 801984, 801986, 801988, 146893, 146894, 802021, 863934,
					95498, 95499, 842942, 842931, 843181, 843149, 842919, 843177, 843121, 842615, 863906, 853348, 863912, 863920,
				],
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				eyesColors: [
					148047, 948972, 1011589, 147383, 948973, 1011587, 333362, 148034, 651407, 1016274, 148057, 148062, 147425, 148060, 148048, 148036,
					948974, 1011590, 1016275, 148059, 1011588, 148037,
				],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0x93000000, 0xbf000000, 0xff000000],
				eyesUpperShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0x630f0440, 0xff000000, 0xff2f2013],
				eyesLowerShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0x630f0440, 0xff000000, 0xff2f2013],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [815469, 333064, 331904, 331903, 815370, 815394, 815395, 815470, 815471, 815472, 815705, 991292],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		[Gender.Female]: {
			[Parts.Body]: {
				skinColors: [0xffdddddd, 0xffcecdcd, 0xffb9b3aa, 0xffac9f97, 0xff9b8b84, 0xff91776f, 0xff8f7265, 0xff826a62, 0xff7d6355, 0xff73614f],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [967090, 937517, 937520, 937528, 937532, 937534, 937535, 937547, 937548, 937549, 937550, 937551, 937553],
			},
			[Parts.Face]: {
				noseTypes: [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xff000000],
				cheeksTintLowers: [
					0x00ffffff, 0x42a95452, 0x6b430401, 0xc1500901, 0x30212b52, 0x540f0440, 0x82070c3d, 0x004a8945, 0xa03f6220, 0xbf364e21,
					0xff000000, 0xff764f32, 0xff563112, 0xff2f2013,
				],
				frownLiness: [0x00ffffff, 0x77a95452, 0xc9430401],
				noseTints: [0x00ffffff, 0xb7a35452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				chinTints: [0x00ffffff, 0xb7a35452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				neckTints: [0x00ffffff, 0x9ba95452, 0xff430401],
				foreHeadTints: [0x00ffffff, 0x77a95452, 0x8c430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					331954, 961138, 1111966, 332199, 332179, 332151, 332150, 332146, 332106, 332104, 332102, 332046, 332039, 332036, 332025, 961136,
					961137, 961139, 961140, 961141, 961142, 961143, 1075990, 331955, 1054701, 1054702,
				],
				facialHairs: null,
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				eyesColors: [
					333128, 469275, 1016279, 262543, 469274, 469271, 262668, 1016276, 262664, 1016271, 262567, 262672, 262673, 1016278, 262693,
					262696, 469276, 1016277, 262695, 262692,
				],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0xb7a95452, 0x84430401, 0xc1500901, 0x680f0440, 0xaf070c3d, 0xa03f6220, 0xbf364e21, 0xff000000],
				eyesUpperShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
				],
				eyesLowerShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
				],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [937377, 937340, 937352, 937361, 937362, 937375, 937376, 937378, 937380, 937381, 937384, 991293],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [0, 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		},
	},
	{
		raceId: Race.DarkElf,
		[Gender.Male]: {
			[Parts.Body]: {
				skinColors: [0xff859aa3, 0xff79919b, 0xff62777b, 0xff52606b, 0xff535b5b],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [546143, 651425, 651426, 937386, 937516, 937427, 937515, 937495, 937496, 937497, 937514, 937513, 937512],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x16a95452, 0x63430401, 0x540f0440, 0xff000000],
				cheeksTintLowers: [0x00ffffff, 0x16a95452, 0x63430401, 0x540f0440, 0xff000000],
				frownLiness: [0x00ffffff, 0x38a95452, 0x70212b52],
				noseTints: [0x00ffffff, 0x38a95452, 0x70212b52, 0xff000000],
				chinTints: [0x00ffffff, 0x38a95452, 0x70212b52],
				neckTints: [0x00ffffff, 0x38a95452, 0x70212b52],
				foreHeadTints: [0x00ffffff, 0x38a95452, 0x70212b52],
			},
			[Parts.Hair]: {
				hairs: [989849, 331902, 331901, 331900, 964597, 964599, 967028, 967600, 967601, 967602, 967603, 967604, 967605, 967606, 967607],
				facialHairs: [
					95498, 1003529, 331957, 331956, 563633, 95493, 95494, 95496, 802016, 802018, 802020, 802014, 802012, 802010, 802004, 802006,
					802008, 801990, 801992, 801994, 801998, 802000, 802002, 801984, 801986, 801988, 146893, 146894, 802021, 95497, 95499, 842942,
					842931, 843181, 843149, 842919, 843177, 843121, 842615,
				],
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37],
				eyesColors: [342311, 342424, 342313, 1011580, 1011581, 333349, 148062],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0x93000000, 0xbf000000, 0xff000000],
				eyesUpperShadows: [0x00ffffff, 0x1ca95452, 0xa8430401, 0xd3212b52, 0xff000000],
				eyesLowerShadows: [0x00ffffff, 0x1ca95452, 0xa8430401, 0xd3212b52, 0xff000000],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [815469, 333064, 331904, 331903, 815370, 815394, 815395, 815470, 815471, 815472, 815705, 991292],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		[Gender.Female]: {
			[Parts.Body]: {
				skinColors: [0xff88b1c6, 0xff799fb3, 0xff77969d, 0xff557688, 0x6b305f65],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [967090, 937517, 937520, 937528, 937532, 937534, 937535, 937547, 937548, 937549, 937550, 937551, 937553],
			},
			[Parts.Face]: {
				noseTypes: [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x1ca95452, 0xa8430401, 0xa8430401, 0xd3212b52, 0xff000000],
				cheeksTintLowers: [0x00ffffff, 0x1ca95452, 0xa8430401, 0xa8430401, 0xd3212b52, 0xff000000],
				frownLiness: [0x00ffffff, 0x77a95452, 0xc9430401],
				noseTints: [0x00ffffff, 0xb7a95452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				chinTints: [0x00ffffff, 0xb7a95452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				neckTints: [0x00ffffff, 0x9ba95452, 0xff430401],
				foreHeadTints: [0x00ffffff, 0x77a95452, 0x8c430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					576111, 576131, 576132, 576133, 576134, 979737, 967618, 967619, 967620, 967621, 967622, 967623, 967624, 967625, 967626, 967627,
				],
				facialHairs: null,
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [6, 7, 8, 9, 11, 13, 14, 17, 20, 22, 23, 24, 25, 26, 27, 28],
				eyesColors: [342314, 342423, 342315, 1084964, 1084961, 333120, 262567],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0xb7a95452, 0x84430401, 0xc1500901, 0x680f0440, 0xaf070c3d, 0xa03f6220, 0xbf364e21, 0xff000000],
				eyesUpperShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
				],
				eyesLowerShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
				],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [937377, 937340, 937352, 937361, 937362, 937375, 937376, 937378, 937380, 937381, 937384, 991293],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
	},
	{
		raceId: Race.HighElf,
		[Gender.Male]: {
			[Parts.Body]: {
				skinColors: [0xffb3a66a, 0xff998d55, 0xff7d7046, 0xff7c6530, 0xff6d653d],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [546143, 651425, 651426, 937386, 937516, 937427, 937515, 937495, 937496, 937497, 937514, 937513, 937512],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				cheeksTintLowers: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				frownLiness: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901],
				noseTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				chinTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xff000000],
				neckTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xff000000],
				foreHeadTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [331902, 331901, 331900, 964597, 964599, 989849, 967028, 967600, 967601, 967602, 967603, 967604, 967605, 967606, 967607],
				facialHairs: [
					1003529, 331957, 331956, 563633, 95493, 95494, 95496, 802016, 802018, 802020, 802014, 802012, 802010, 802004, 802006, 802008,
					801990, 801992, 801994, 801998, 802000, 802002, 801984, 801986, 801988, 146893, 146894, 802021, 95497, 95498, 95499, 842942,
					842931, 843181, 843149, 842919, 843177, 843121, 842615,
				],
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [6, 7, 8, 17, 18, 21, 22, 23, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37],
				eyesColors: [333351, 262681, 262544, 1011583, 262671, 1011584, 262680, 148062],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0x93000000, 0xbf000000, 0xff000000],
				eyesUpperShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				eyesLowerShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [815469, 333064, 331904, 331903, 815370, 815394, 815395, 815470, 815471, 815472, 815705, 991292],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		[Gender.Female]: {
			[Parts.Body]: {
				skinColors: [0xffc5c994, 0xffb7ba7d, 0xff99a06d, 0xff948f58, 0xff808558],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [967090, 937517, 937520, 937528, 937532, 937534, 937535, 937547, 937548, 937549, 937550, 937551, 937553],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xff000000],
				cheeksTintLowers: [0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0xff000000],
				frownLiness: [0x00ffffff, 0x77a95452, 0xc9430401],
				noseTints: [0x00ffffff, 0xb7a95452, 0xb7430401, 0xe2800901, 0xff764f32, 0xff2f2013, 0xff000000],
				chinTints: [0x00ffffff, 0xb7a95452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				neckTints: [0x00ffffff, 0x9ba95452, 0xff430401],
				foreHeadTints: [0x00ffffff, 0x77a95452, 0x8c430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					576111, 576131, 576132, 576133, 576134, 979737, 967618, 967619, 967620, 967621, 967622, 967623, 967624, 967625, 967626, 967627,
				],
				facialHairs: null,
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [6, 7, 8, 21, 22, 23, 24, 25, 26, 27, 28],
				eyesColors: [333119, 262685, 262684, 1084965, 262665, 1084966, 262567],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0xb7a95452, 0x84430401, 0xc1500901, 0x680f0440, 0xaf070c3d, 0xa03f6220, 0xbf364e21, 0xff000000],
				eyesUpperShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
					0xff764f32, 0xff563112, 0xff2f2013,
				],
				eyesLowerShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
					0xff764f32, 0xff563112, 0xff2f2013,
				],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [937377, 937340, 937352, 937361, 937362, 937375, 937376, 937378, 937380, 937381, 937384, 991293],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
	},
	{
		raceId: Race.Imperial,
		[Gender.Male]: {
			[Parts.Body]: {
				skinColors: [0xffc6b0a8, 0xffb79c91, 0xffa7867a, 0xff826d5b, 0xff706156, 0xff615349, 0xff5c4332, 0xff573d33, 0xff523d30, 0xff5c3d36],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [546143, 651425, 651426, 937386, 937516, 937427, 937515, 937495, 937496, 937497, 937514, 937513, 937512],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0xff000000, 0xff2f2013],
				cheeksTintLowers: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0xff000000, 0xff2f2013],
				frownLiness: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901],
				noseTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				chinTints: [0x00ffffff, 0x6b430401, 0x7f500901, 0x59212b52, 0xff2f2013],
				neckTints: [0x00ffffff, 0x6b430401, 0x7f500901, 0x59212b52, 0xff2f2013],
				foreHeadTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					332816, 630112, 630140, 630141, 630142, 630143, 630144, 332805, 333063, 333013, 332984, 332887, 332822, 332818, 332808, 332806,
					332814, 332812, 332810, 916272, 916480, 916481, 916482, 916483, 916484, 916485, 916486, 332803, 332799,
				],
				facialHairs: [
					95497, 1003529, 331957, 331956, 563633, 95493, 95494, 95496, 802016, 802018, 802020, 802014, 802012, 802010, 802004, 802006,
					802008, 801990, 801992, 801994, 801998, 802000, 802002, 863936, 863938, 801984, 801986, 801988, 146893, 146894, 802021, 863934,
					95498, 95499, 842942, 842931, 843181, 843149, 842919, 843177, 843121, 842615, 863906, 853348, 863912, 863920,
				],
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				eyesColors: [
					148047, 948972, 1011589, 147383, 948973, 1011587, 333362, 148034, 651407, 1016274, 148057, 148062, 147425, 148060, 148048, 148036,
					948974, 1011590, 1016275, 148059, 1011588, 148037,
				],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0x93000000, 0xbf000000, 0xff000000],
				eyesUpperShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0x630f0440, 0xff000000, 0xff2f2013],
				eyesLowerShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0x630f0440, 0xff000000, 0xff2f2013],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [815469, 333064, 331904, 331903, 815370, 815394, 815395, 815470, 815471, 815472, 815705, 991292],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		[Gender.Female]: {
			[Parts.Body]: {
				skinColors: [0xffdddddd, 0xffcdcdcc, 0xffb9b3aa, 0xffac9f97, 0xff978b84, 0xff91816f, 0xff8f7265, 0xff826a62, 0xff7d6355, 0xff73614f],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [967090, 937517, 937520, 937528, 937532, 937534, 937535, 937547, 937548, 937549, 937550, 937551, 937553],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xff000000],
				cheeksTintLowers: [
					0x00ffffff, 0x42a95452, 0x6b430401, 0xc1500901, 0x30212b52, 0x540f0440, 0x82070c3d, 0x004a8945, 0xa03f6220, 0xbf364e21,
					0xff000000, 0xff764f32, 0xff563112, 0xff2f2013,
				],
				frownLiness: [0x00ffffff, 0x77a95452, 0xc9430401],
				noseTints: [0x00ffffff, 0xb7a35452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				chinTints: [0x00ffffff, 0xb7a35452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				neckTints: [0x00ffffff, 0x9ba95452, 0xff430401],
				foreHeadTints: [0x00ffffff, 0x77a95452, 0x8c430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					961137, 1111966, 332199, 332179, 332151, 332150, 332146, 332106, 332104, 332102, 332046, 332039, 332036, 332025, 961136, 961138,
					961139, 961140, 961141, 961142, 961143, 1075990, 331955, 331954, 1054701, 1054702,
				],
				facialHairs: null,
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				eyesColors: [
					262693, 469275, 1016279, 262543, 469274, 469271, 262668, 1016276, 262664, 1016271, 262567, 262673, 1016278, 333128, 262696,
					469276, 1016277, 262695, 262692,
				],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0xb7a95452, 0x84430401, 0xc1500901, 0x680f0440, 0xaf070c3d, 0xa03f6220, 0xbf364e21, 0xff000000],
				eyesUpperShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
				],
				eyesLowerShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
				],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [937377, 937340, 937352, 937361, 937362, 937375, 937376, 937378, 937380, 937381, 937384, 991293],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
	},
	{
		raceId: Race.Khajit,
		[Gender.Male]: {
			[Parts.Body]: {
				skinColors: [
					0xfffdfdfd, 0xffc9ebeb, 0xffcec8b0, 0x4fd59104, 0xffd26900, 0xce956440, 0x00ffffff, 0x28070c3d, 0xa8764f32, 0xa3563112,
					0xbc2f2013, 0x7f000000,
				],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_01.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [977024, 977025, 997646, 997648, 997645, 997647, 997649, 997657, 997658, 997659, 997660, 997661, 997662],
			},
			[Parts.Face]: {
				noseTypes: [0, 1, 2, 3, 4, 5],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				cheeksTintLowers: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				frownLiness: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				noseTints: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				chinTints: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				neckTints: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				foreHeadTints: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
			},
			[Parts.Hair]: {
				hairs: [976988, 865115, 865117, 865123, 865124, 865125, 865127, 534973, 865137],
				facialHairs: [976981, 865143, 865129, 865144, 865139, 865142],
				hairColors: [0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418, 0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff101212],
			},
			[Parts.Eyes]: {
				eyesForms: [0, 1, 2, 3, 4, 5],
				eyesColors: [333067, 977004, 1072465, 977005, 977006, 977007, 977008, 977009, 977010, 977011, 977012],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0xff000000, 0xff2f2013, 0xc9956440, 0xb7430401],
				eyesUpperShadows: [0x00ffffff, 0xcefdfdfd],
				eyesLowerShadows: [0x00ffffff, 0xff000000, 0xff2f2013, 0xc9956440, 0xb7430401],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: null,
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [0, 1, 2, 3, 4, 5],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xc9956440, 0xb7430401, 0xcefdfdfd],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		[Gender.Female]: {
			[Parts.Body]: {
				skinColors: [
					0xfffdfdfd, 0xffc9ebeb, 0xffcec8b0, 0x4fd59104, 0xffd26900, 0xce956440, 0x00ffffff, 0x28070c3d, 0xa8764f32, 0xa3563112,
					0xbc2f2013, 0x7f000000,
				],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_01.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [997638, 997639, 997641, 997643, 997650, 997651, 997652, 997653, 997654, 997655, 997656, 997640, 997642, 997644],
			},
			[Parts.Face]: {
				noseTypes: [0, 1, 2, 3, 4, 5],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				cheeksTintLowers: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				frownLiness: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				noseTints: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				chinTints: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				neckTints: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
				foreHeadTints: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xffc995644, 0xffb7430401, 0xffcefdfdfd],
			},
			[Parts.Hair]: {
				hairs: [976988, 865111, 865108, 865110, 865111, 865113, 865138],
				facialHairs: null,
				hairColors: [0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418, 0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff101212],
			},
			[Parts.Eyes]: {
				eyesForms: [0, 1, 2, 3, 4, 5],
				eyesColors: [187841, 977014, 977015, 977016, 977017, 977018, 977019, 977020, 977021, 977022],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0xff000000, 0xff2f2013, 0xc9956440, 0xb7430401],
				eyesUpperShadows: [0x00ffffff, 0xcefdfdfd],
				eyesLowerShadows: [0x00ffffff, 0xff000000, 0xff2f2013, 0xc9956440, 0xb7430401],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: null,
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [0, 1, 2, 3, 4, 5],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0xff000000, 0xff110e06, 0xff2f2013, 0xc9956440, 0xb7430401, 0xcefdfdfd],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		},
	},
	{
		raceId: Race.Nord,
		[Gender.Male]: {
			[Parts.Body]: {
				skinColors: [0xffc6b0a8, 0xffb79c91, 0xffa7867a, 0xff826d5b, 0xff706156, 0xff615349, 0xff5c4332, 0xff573d33, 0xff523d30, 0xff5c3d36],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [546143, 651425, 651426, 937386, 937516, 937427, 937515, 937495, 937496, 937497, 937514, 937513, 937512],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0xff000000, 0xff2f2013],
				cheeksTintLowers: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0xff000000, 0xff2f2013],
				frownLiness: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901],
				noseTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				chinTints: [0x00ffffff, 0x6b430401, 0x7f500901, 0x59212b52, 0xff2f2013],
				neckTints: [0x00ffffff, 0x6b430401, 0x7f500901, 0x59212b52, 0xff2f2013],
				foreHeadTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					333063, 630112, 630140, 630141, 630142, 630143, 630144, 332805, 333013, 332984, 332887, 332822, 332818, 332816, 332808, 332806,
					332814, 332812, 332810, 916272, 916480, 916481, 916482, 916483, 916484, 916485, 916486, 332803, 332799,
				],
				facialHairs: [
					331956, 1003529, 331957, 563633, 95493, 95494, 95496, 802016, 802018, 802020, 802014, 802012, 802010, 802004, 802006, 802008,
					801990, 801992, 801994, 801998, 802000, 802002, 863936, 863938, 801984, 801986, 801988, 146893, 146894, 802021, 863934, 95497,
					95498, 95499, 842942, 842931, 843181, 843149, 842919, 843177, 843121, 842615, 863906, 853348, 863912, 863920,
				],
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				eyesColors: [
					148036, 948972, 1011589, 147383, 948973, 1011587, 333362, 148034, 651407, 1016274, 148057, 148062, 147425, 148060, 148048, 148047,
					948974, 1011590, 1016275, 148059, 1011588, 148037,
				],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0x93000000, 0xbf000000, 0xff000000],
				eyesUpperShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0x630f0440, 0xff000000, 0xff2f2013],
				eyesLowerShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0x630f0440, 0xff000000, 0xff2f2013],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [815469, 333064, 331904, 331903, 815370, 815394, 815395, 815470, 815471, 815472, 815705, 991292],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		[Gender.Female]: {
			[Parts.Body]: {
				skinColors: [0xffdddddd, 0xffcdcdcc, 0xffb9b3aa, 0xffac9f97, 0xff978b84, 0xff91816f, 0xff8f7265, 0xff826a62, 0xff7d6355, 0xff73614f],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [967090, 937517, 937520, 937528, 937532, 937534, 937535, 937547, 937548, 937549, 937550, 937551, 937553],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xff000000],
				cheeksTintLowers: [
					0x00ffffff, 0x42a95452, 0x6b430401, 0xc1500901, 0x30212b52, 0x540f0440, 0x82070c3d, 0x004a8945, 0xa03f6220, 0xbf364e21,
					0xff000000, 0xff764f32, 0xff563112, 0xff2f2013,
				],
				frownLiness: [0x00ffffff, 0x77a95452, 0xc9430401],
				noseTints: [0x00ffffff, 0xb7a35452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				chinTints: [0x00ffffff, 0xb7a35452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				neckTints: [0x00ffffff, 0x9ba95452, 0xff430401],
				foreHeadTints: [0x00ffffff, 0x77a95452, 0x8c430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					332146, 1111966, 332199, 332179, 332151, 332150, 332106, 332104, 332102, 332046, 332039, 332036, 332025, 961136, 961137, 961138,
					961139, 961140, 961141, 961142, 961143, 1075990, 331955, 331954, 1054701, 1054702,
				],
				facialHairs: null,
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				eyesColors: [
					262696, 469275, 1016279, 262543, 469274, 469271, 262668, 1016276, 262664, 1016271, 262567, 262672, 262673, 1016278, 262693,
					333128, 469276, 1016277, 262695, 262692,
				],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0xb7a95452, 0x84430401, 0xc1500901, 0x680f0440, 0xaf070c3d, 0xa03f6220, 0xbf364e21, 0xff000000],
				eyesUpperShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
				],
				eyesLowerShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
				],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [937377, 937340, 937352, 937361, 937362, 937375, 937376, 937378, 937380, 937381, 937384, 991293],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
	},
	{
		raceId: Race.Orc,
		[Gender.Male]: {
			[Parts.Body]: {
				skinColors: [0x04020d, 0x0f6f77, 0x04020a, 0x040229, 0x04022a, 0x0f6f75, 0x040226, 0x04020b, 0x09250a, 0x0f6f76],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [937516, 546143, 651425, 651426, 937386, 937427, 937515, 937495, 937496, 937497, 937514, 937513, 937512],
			},
			[Parts.Face]: {
				noseTypes: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x1ca95452, 0xa8430401, 0xd3212b52, 0xff000000],
				cheeksTintLowers: [0x00ffffff, 0x1ca95452, 0xa8430401, 0xd3212b52, 0xff000000],
				frownLiness: [0x00ffffff, 0x38a95452, 0x70212b52],
				noseTints: [0x00ffffff, 0x3aa95452, 0x70212b52, 0xff000000],
				chinTints: [0x00ffffff, 0x38a95452, 0x70212b52],
				neckTints: [0x00ffffff, 0x38a95452, 0x70212b52],
				foreHeadTints: [0x00ffffff, 0x38a95452, 0x70212b52],
			},
			[Parts.Hair]: {
				hairs: [267598, 386967, 386975, 387096], // 386969, 386966, 386970, 386971, 386973
				facialHairs: [
					331957, 1003529, 331956, 563633, 95493, 95494, 95496, 802016, 802018, 802020, 802014, 802012, 802010, 802004, 802006, 802008,
					801990, 801992, 801994, 801998, 802000, 802002, 863936, 863938, 801984, 801986, 801988, 146893, 146894, 802021, 863934, 95497,
					95498, 95499, 842942, 842931, 843181, 843149, 842919, 843177, 843121, 842615, 863906, 853348, 863912, 863920,
				],
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
				eyesColors: [599306, 148062, 262669, 262697, 262698, 1011573, 262694, 262667, 1011574],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0x93000000, 0xbf000000, 0xff000000],
				eyesUpperShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				eyesLowerShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [
					331904, 815469, 333064, 331903, 815370, 815394, 815395, 815470, 815471, 815472, 815705, 991292, 1078810, 1078803, 1078811,
					1078808, 1078809,
				],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		[Gender.Female]: {
			[Parts.Body]: {
				skinColors: [0xff5e8a7c, 0xff5a7a75, 0xff638171, 0xff4a6455, 0xff3d5249],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [967090, 937517, 937520, 937528, 937532, 937534, 937535, 937547, 937548, 937549, 937550, 937551, 937553],
			},
			[Parts.Face]: {
				noseTypes: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x1ca95452, 0xa8430401, 0xd3212b52, 0xff000000],
				cheeksTintLowers: [0x00ffffff, 0x1ca95452, 0xa8430401, 0xd3212b52, 0xff000000],
				frownLiness: [0x00ffffff, 0x38a95452, 0x70212b52],
				noseTints: [0x00ffffff, 0x3aa95452, 0x70212b52, 0xff000000],
				chinTints: [0x00ffffff, 0x38a95452, 0x70212b52],
				neckTints: [0x00ffffff, 0x38a95452, 0x70212b52],
				foreHeadTints: [0x00ffffff, 0x38a95452, 0x70212b52],
			},
			[Parts.Hair]: {
				hairs: [548296, 548298, 548327, 548328, 548329, 548330, 548331, 548332, 1073826, 548299],
				facialHairs: null,
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
				eyesColors: [262690, 262567, 262686, 262687, 262688, 1071954, 262689, 1071953, 1071955],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0xb7a95452, 0x84430401, 0xc1500901, 0x680f0440, 0xaf070c3d, 0xa03f6220, 0xbf364e21, 0xff000000],
				eyesUpperShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
					0xff764f32, 0xff563112, 0xff2f2013,
				],
				eyesLowerShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
					0xff764f32, 0xff563112, 0xff2f2013,
				],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [937377, 937340, 937352, 937361, 937362, 937375, 937376, 937378, 937380, 937381, 937384, 991293],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
	},
	{
		raceId: Race.Redguard,
		[Gender.Male]: {
			[Parts.Body]: {
				skinColors: [0xff715744, 0xff7b564d, 0xff765c52, 0xff4f4540, 0xff513d35, 0xff473327, 0xff432c21, 0xff352722, 0xff302116, 0xff2d211e],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [546143, 651425, 651426, 937386, 937516, 937427, 937515, 937495, 937496, 937497, 937514, 937513, 937512],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xc1500901, 0x59212b52, 0x630f0440, 0xff000000, 0xff2f2013],
				cheeksTintLowers: [0x00ffffff, 0x60a95452, 0x6b430401, 0xc1500901, 0x59212b52, 0x630f0440, 0xff000000, 0xff2f2013],
				frownLiness: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901],
				noseTints: [0x00ffffff, 0x11a95452, 0x42430401, 0x72500901, 0xff000000],
				chinTints: [0x00ffffff, 0x6b430401, 0x7f500901, 0x59212b52, 0xff2f2013],
				neckTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xc1500901, 0xff000000, 0xff2f2013],
				foreHeadTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					332796, 630112, 630140, 630141, 630142, 630143, 630144, 332805, 333063, 333013, 332984, 332887, 332822, 332818, 332816, 332808,
					332806, 332814, 332812, 332810, 916272, 916480, 916481, 916482, 916483, 916484, 916485, 916486, 332803, 332799, 332798, 332797,
					332795, 947565,
				],
				facialHairs: [
					331956, 1003529, 331957, 563633, 95493, 95494, 95496, 802016, 802018, 802020, 802014, 802012, 802010, 802004, 802006, 802008,
					801990, 801992, 801994, 801998, 802000, 802002, 863936, 863938, 801984, 801986, 801988, 146893, 146894, 802021, 863934, 95497,
					95498, 95499, 842942, 842931, 843181, 843149, 842919, 843177, 843121, 842615, 863906, 853348, 863912, 863920,
				],
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				eyesColors: [
					948972, 1011589, 147383, 948973, 1011587, 333362, 148034, 651407, 1016274, 148057, 148062, 147425, 148060, 148047, 148048, 148036,
					948974, 1011590, 1016275, 148059, 1011588, 148037,
				],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0x93000000, 0xbf000000, 0xff000000],
				eyesUpperShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0x630f0440, 0xff000000, 0xff2f2013],
				eyesLowerShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0x59212b52, 0x630f0440, 0xff000000, 0xff2f2013],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [815469, 333064, 331904, 331903, 815370, 815394, 815395, 815470, 815471, 815472, 815705, 991292],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		[Gender.Female]: {
			[Parts.Body]: {
				skinColors: [0xff715744, 0xff7b564d, 0xff765c52, 0xff4f4540, 0xff513d35, 0xff473327, 0xff432c21, 0xff352722, 0xff302116, 0xff2d211e],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [967090, 937517, 937520, 937528, 937532, 937534, 937535, 937547, 937548, 937549, 937550, 937551, 937553],
			},
			[Parts.Face]: {
				noseTypes: [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d],
				cheeksTintLowers: [0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d],
				frownLiness: [0x00ffffff, 0x77a95452, 0xc9430401],
				noseTints: [0x00ffffff, 0xb7a35452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				chinTints: [0x00ffffff, 0xb7a35452, 0xb7430401, 0xe1500901, 0xff764f32, 0xff2f2013, 0xff000000],
				neckTints: [0x00ffffff, 0x9ba95452, 0xff430401],
				foreHeadTints: [0x00ffffff, 0x77a95452, 0x8c430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					1111966, 332199, 332179, 332151, 332150, 332146, 332106, 332104, 332102, 332046, 332039, 332036, 332025, 961136, 961137, 961138,
					961139, 961140, 961141, 961142, 961143, 1075990, 331954, 1054701, 1054702,
				],
				facialHairs: null,
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				eyesColors: [
					469271, 469275, 1016279, 262543, 469274, 262668, 1016276, 262664, 1016271, 262567, 262672, 262673, 1016278, 262693, 333128,
					262696, 469276, 1016277, 262695, 262692,
				],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0xb7a95452, 0x84430401, 0xc1500901, 0x680f0440, 0xaf070c3d, 0xa03f6220, 0xbf364e21, 0xff000000],
				eyesUpperShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
				],
				eyesLowerShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
				],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [937377, 937340, 937352, 937361, 937362, 937375, 937376, 937378, 937380, 937381, 937384, 991293],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
	},
	{
		raceId: Race.WoodElf,
		[Gender.Male]: {
			[Parts.Body]: {
				skinColors: [0xff9a9b97, 0xff968d7c, 0xff847e68, 0xff746d56, 0xff726d54],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\MaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [546143, 651425, 651426, 937386, 937516, 937427, 937515, 937495, 937496, 937497, 937514, 937513, 937512],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				cheeksTintLowers: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				frownLiness: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901],
				noseTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				chinTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xff000000],
				neckTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xff000000],
				foreHeadTints: [0x00ffffff, 0x60a95452, 0x6b430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [964597, 331902, 331901, 331900, 964599, 989849, 967028, 967600, 967601, 967602, 967603, 967604, 967605, 967606, 967607],
				facialHairs: [
					1003529, 331957, 331956, 563633, 95493, 95494, 95496, 802016, 802018, 802020, 802014, 802012, 802010, 802004, 802006, 802008,
					801990, 801992, 801994, 801998, 802000, 802002, 801984, 801986, 801988, 146893, 146894, 802021, 95497, 95498, 95499, 842942,
					842931, 843181, 843149, 842919, 843177, 843121, 842615,
				],
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [6, 7, 8, 17, 26, 31, 32, 33, 34, 35, 36, 37],
				eyesColors: [333350, 148062, 342306, 342295, 1011577, 342303, 342305, 1011576],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0x93000000, 0xbf000000, 0xff000000],
				eyesUpperShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
				eyesLowerShadows: [0x00ffffff, 0x60a95452, 0x6b430401, 0x7f500901, 0xff000000, 0xff2f2013],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [815469, 333064, 331904, 331903, 815370, 815394, 815395, 815470, 815471, 815472, 815705, 991292],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
		[Gender.Female]: {
			[Parts.Body]: {
				skinColors: [0xff95816f, 0xff816b5a, 0xff876a4b, 0xff795b40, 0xff6f563e],
				weights: [0, 100],
			},
			[Parts.Head]: {
				dirtTints: [
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_01.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_02.dds',
						type: 14,
					},
					{
						texturePath: 'Actors\\Character\\Character Assets\\TintMasks\\FemaleHeadDirt_03.dds',
						type: 14,
					},
				],
				dirtColors: [0x00ffffff, 0xff563112, 0xff2f2013, 0xff000000],
				faceScars: [967090, 937517, 937520, 937528, 937532, 937534, 937535, 937547, 937548, 937549, 937550, 937551, 937553],
			},
			[Parts.Face]: {
				noseTypes: [1, 2, 3, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				noseLengths: [-1, 1],
				noseHeights: [-1, 1],
				jawWidths: [-1, 1],
				jawHeights: [-1, 1],
				cheekboneHeights: [-1, 1],
				cheekboneWidths: [-1, 1],
				cheeksTints: [0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0xff000000],
				cheeksTintLowers: [0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0xff000000],
				frownLiness: [0x00ffffff, 0x77a95452, 0xc9430401],
				noseTints: [0x00ffffff, 0xb7430401, 0xe2500901, 0xff764f32, 0xff2f2013, 0xff000000],
				chinTints: [0x00ffffff, 0xb7430401, 0xe2500901, 0xff764f32, 0xff2f2013, 0xff000000],
				neckTints: [0x00ffffff, 0x73a95452, 0xff430401],
				foreHeadTints: [0x00ffffff, 0x77a95452, 0x8c430401, 0xff000000],
			},
			[Parts.Hair]: {
				hairs: [
					576111, 576131, 576132, 576133, 576134, 979737, 967618, 967619, 967620, 967621, 967622, 967623, 967624, 967625, 967626, 967627,
				],
				facialHairs: null,
				hairColors: [
					0xff383b2c, 0xff433d2e, 0xff393728, 0xff514d39, 0xff42352d, 0xff302321, 0xff2f2924, 0xff272623, 0xff1a1c1c, 0xff141418,
					0xff2b3133, 0xff46505a, 0xff5a5f69, 0xff5c5850, 0xff101212,
				],
			},
			[Parts.Eyes]: {
				eyesForms: [6, 7, 8, 17, 22, 23, 24, 25, 26, 27, 28],
				eyesColors: [333072, 262567, 342421, 342316, 1084968, 342317, 1084967, 342361],
				eyesHeigths: [-1, 1],
				eyesDistances: [-1, 1],
				eyesDepths: [-1, 1],
				eyesLinerColors: [0x00ffffff, 0xb7a95452, 0x84430401, 0xc1500901, 0x680f0440, 0xaf070c3d, 0xa03f6220, 0xbf364e21, 0xff000000],
				eyesUpperShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
					0xff764f32, 0xff563112, 0xff2f2013,
				],
				eyesLowerShadows: [
					0x00ffffff, 0x72a95452, 0xaf430401, 0xd3500901, 0x56212b52, 0x870f0440, 0xb5070c3d, 0xa03f6220, 0xbf364e21, 0xff000000,
					0xff764f32, 0xff563112, 0xff2f2013,
				],
			},
			[Parts.Eyebrows]: {
				eyebrowsTypes: [937377, 937340, 937352, 937361, 937362, 937375, 937376, 937378, 937380, 937381, 937384, 991293],
				eyebrowsHeigths: [-1, 1],
				eyebrowsWeights: [-1, 1],
				eyebrowsForwards: [-1, 1],
			},
			[Parts.Mouth]: {
				lipsTypes: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				lipsHeigths: [-1, 1],
				lipsForwards: [-1, 1],
				chinWeigths: [-1, 1],
				chinLengths: [-1, 1],
				chinForwards: [-1, 1],
				lipsColors: [0x00ffffff, 0x6b430401, 0xc6500901, 0x590f0440, 0x8e070c3d, 0x9b2f2013, 0xff000000],
			},
			[Parts.Clothes]: {
				top: [0],
				shoes: [0],
			},
			presetIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		},
	},
]
