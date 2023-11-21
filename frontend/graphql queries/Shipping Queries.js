// SHIPPING
// GET ALL
{
	shippings {
		arrived_areas
		arrived_date
		arrived_pass_date
		arrived_pass_time
		arrived_time
		cost_additional_fee
		cost_crew_note
		cost_daily_wages
		cost_crews
		cost_deposit
		cost_other_note
		cost_shipping_fee
		cost_others
		departure_areas
		departure_date
		depature_pass_date
		depature_pass_time
		depature_time
		fuel_af
		fuel_cbd
		fuel_ibd
		fuel_iwa
		fuel_note
		id
		main_attachments
		main_bl
		main_cargo
		main_charterer {
			company
			id
		}
		main_load_unload_port
		main_note
		main_ship {
			vesselName
			id
			mariners {
			dailyFee
			id
			name
			job {
				name
				id
			}
			duty {
				name
				id
			}
			}
		}
		main_snumber
		navigation_areas
	}
}

// CREATE

mutation {
  	createShippings(
  		input: {
			id: "a700d17c-3745-42cb-8de4-d48b7eefd3ec"

			navigation_areas: "[{\"area_id\":\"503f639a-4764-41d7-9a61-66af5aae32b8\",\"area_in_date\":\"2023-11-06\",\"area_in_time\":\"15:40\",\"area_out_date\":\"2023-11-08\",\"area_out_time\":\"07:35\",\"area_note\":\"The Messages app provides users with sent and received message history.\",\"loads\":[],\"unloads\":[],\"area\":{\"id\":\"503f639a-4764-41d7-9a61-66af5aae32b8\",\"name\":\"Beafort Sea\",\"note\":\"This is Beafort Sea.\"}}]"

			main_snumber: "S2023-537"

			main_ship: {
				connect: {
					where: {
						node: {
							id: "4d77d7e7-5460-4050-90e0-d643ceebe917"
						}
					}
				}
			}

			main_note: "Kelton is a strategic consultancy that helps businesses discover new paths to growth."

			main_load_unload_port: "ShangHai"

			main_charterer: {
				connect: {
					where: {
						node: {
							id: "0b568573-1c93-4818-877d-f1c7d13c8c00"
						}
					}
				}
			}

			main_cargo: "Computer"

			main_bl: "BL-849-809830458E7"

			main_attachments: "[]"

			fuel_note: "How to use text in a sentence."

			fuel_iwa: "1000"

			fuel_ibd: "450"

			fuel_cbd: "3500"

			fuel_af: "5000"

			depature_time: ""

			depature_pass_time: ""

			depature_pass_date: ""

			departure_date: "2023-11-01"

			departure_areas: "[{\"area_id\":\"6d6ae6df-67ae-4d80-a86e-15b9b1f49781\",\"area_in_date\":\"2023-11-01\",\"area_in_time\":\"18:00\",\"area_out_date\":\"2023-11-03\",\"area_out_time\":\"19:30\",\"area_note\":\"We turn insights and data into ideas that transform some of the top brands in the world.\",\"loads\":[{\"load_arrived_date\":\"2023-11-01\",\"load_arrived_time\":\"20:30\",\"load_from_date\":\"2023-11-01\",\"load_from_time\":\"21:30\",\"load_to_date\":\"2023-11-02\",\"load_to_time\":\"03:30\",\"load_checked\":true,\"load_checked_date\":\"2023-11-01\",\"load_weight\":\"1500\",\"load_port\":\"BuJang\",\"load_note\":\"Text abbreviations are shortened versions of a word or phrase used.\"}],\"unloads\":[{\"unload_arrived_date\":\"2023-11-02\",\"unload_arrived_time\":\"05:30\",\"unload_from_date\":\"2023-11-02\",\"unload_from_time\":\"07:40\",\"unload_to_date\":\"2023-11-02\",\"unload_to_time\":\"10:30\",\"unload_weight\":\"550\",\"unload_port\":\"SuJang\",\"unload_note\":\"The abbreviations and acronyms are used to save time, avoid typing and ensure a social media post stays within a certain character limit.\"}],\"area\":{\"id\":\"6d6ae6df-67ae-4d80-a86e-15b9b1f49781\",\"name\":\"Estuary\",\"note\":\"This is Estuary.\"}},{\"area_id\":\"2b7cc207-4a03-4614-83db-9fb8f9e9b6a7\",\"area_in_date\":\"2023-11-03\",\"area_in_time\":\"15:35\",\"area_out_date\":\"2023-11-05\",\"area_out_time\":\"09:00\",\"area_note\":\"Every Android phone has Google applications, including the Messages app.\",\"loads\":[],\"unloads\":[],\"area\":{\"id\":\"2b7cc207-4a03-4614-83db-9fb8f9e9b6a7\",\"name\":\"Arabian Sea\",\"note\":\"This is Arabian Sea.\"}}]"

			cost_shipping_fee: "5000"

			cost_others: "[{\"id\":1,\"item\":\"Coffee\",\"price\":\"1500\",\"from\":\"2023-11-01\",\"to\":\"2023-11-11\",\"amount\":15000},{\"id\":2,\"item\":\"Cigratte\",\"price\":\"300\",\"from\":\"2023-11-01\",\"to\":\"2023-11-11\",\"amount\":3000}]"

			cost_other_note: "A text is any stretch of language that can be understood in context. It may be as simple as 1-2 words (such as a stop sign) or as complex as a novel."

			cost_deposit: "480"

			cost_daily_wages: "7800"

			cost_crews: "[{\"id\":\"c05d35ba-7be0-4b63-aea4-f07597be76e5\",\"mariner_daily_fee\":26,\"mariner_days\":0},{\"id\":\"e83b3e0a-7db9-4cbc-a21c-342892e2cd42\",\"mariner_daily_fee\":49,\"mariner_days\":0},{\"id\":\"49650d75-a99b-4729-bf1e-438d36d6f94a\",\"mariner_daily_fee\":45,\"mariner_days\":0},{\"id\":\"d1a4078d-db8b-43aa-b2b8-394a51f16a15\",\"mariner_daily_fee\":39,\"mariner_days\":0},{\"id\":\"b1715e19-e5a4-4b7d-83c8-3fa4ddb250cc\",\"mariner_daily_fee\":42,\"mariner_days\":0},{\"id\":\"f0db14a3-6ff3-454a-be76-726011627fde\",\"mariner_daily_fee\":31,\"mariner_days\":0},{\"id\":\"bb8f8b69-9839-4c61-b72c-223c65f7d765\",\"mariner_daily_fee\":41,\"mariner_days\":0},{\"id\":\"ee283e2a-f69a-48ef-b72e-a4ddd47dc91e\",\"mariner_daily_fee\":37,\"mariner_days\":0},{\"id\":\"c4651608-5900-4cab-9d2b-de9589863e97\",\"mariner_daily_fee\":26,\"mariner_days\":0},{\"id\":\"eb75b8af-f7e6-4e6d-a970-e6dd4e98eb59\",\"mariner_daily_fee\":23,\"mariner_days\":0},{\"id\":\"474a1fda-85a5-4a3f-a3a2-f03441e21a25\",\"mariner_daily_fee\":29,\"mariner_days\":0},{\"id\":\"93e4f384-dba9-4715-b1cc-f97cf8ec927b\",\"mariner_daily_fee\":32,\"mariner_days\":0},{\"id\":\"6eca3789-325d-424b-a087-5078c61b989e\",\"mariner_daily_fee\":26,\"mariner_days\":0},{\"id\":\"7fbe56f2-2a78-4606-ab2a-7b1c6fab67d6\",\"mariner_daily_fee\":50,\"mariner_days\":0},{\"id\":\"d0797632-3fda-48eb-a8a3-193c2dd48384\",\"mariner_daily_fee\":35,\"mariner_days\":0},{\"id\":\"faa0650d-f310-44ce-ab4d-fe6d9dcc0123\",\"mariner_daily_fee\":20,\"mariner_days\":0},{\"id\":\"32ceb57e-ec7b-43eb-924a-f731f89b6e3e\",\"mariner_daily_fee\":26,\"mariner_days\":0}]"

			cost_crew_note: "Traditionally, a text is understood to be a piece of written or spoken material in its primary form (as opposed to a paraphrase or summary)."

			cost_additional_fee: "4500"

			arrived_time: "15:40"

			arrived_pass_time: "09:45"

			arrived_pass_date: "2023-11-11"

			arrived_date: "2023-11-08"

			arrived_areas: "[{\"area_id\":\"89ff9119-e446-4124-8031-068a2deb3b0d\",\"area_in_date\":\"2023-11-09\",\"area_in_time\":\"15:40\",\"area_out_date\":\"2023-11-10\",\"area_out_time\":\"15:40\",\"area_note\":\"\"The meaning of TEXT is the original words and form of a written or printed work.\",\"loads\":[],\"unloads\":[{\"unload_arrived_date\":\"2023-11-09\",\"unload_arrived_time\":\"18:40\",\"unload_from_date\":\"2023-11-09\",\"unload_from_time\":\"21:45\",\"unload_to_date\":\"2023-11-10\",\"unload_to_time\":\"06:40\",\"unload_weight\":\"2000\",\"unload_port\":\"BanJang\",\"unload_note\":\"How to use text in a sentence.\"}],\"area\":{\"id\":\"89ff9119-e446-4124-8031-068a2deb3b0d\",\"name\":\"Bay\",\"note\":\"This is Bay.\"}}]"
		}
	) {
    	shippings {
    		id
    	}
	}
}

// UPDATE
mutation {
	updateShippings(
		where: { id: "a700d17c-3745-42cb-8de4-d48b7eefd3ec" }
		update: {
			main_snumber: "S2023-537"

			main_ship: {
				disconnect: {},
				connect: {
					where: {
						node: {
							id: "4d77d7e7-5460-4050-90e0-d643ceebe917"
						}
					}
				}
			}

			main_note: "Kelton is a strategic consultancy that helps businesses discover new paths to growth."

			main_load_unload_port: "ShangHai"

			main_charterer: {
				disconnect: {}
				connect: {
					where:{
						node: {
							id: "0b568573-1c93-4818-877d-f1c7d13c8c00"
						}
					}
				}
			}

			main_cargo: "Computer"

			main_bl: "BL-849-809830458E7"

			main_attachments: "[]"

			fuel_note: "How to use text in a sentence."

			fuel_iwa: "1000"

			fuel_ibd: "450"

			fuel_cbd: "3500"

			fuel_af: "5000"

			depature_time: ""

			depature_pass_time: ""

			depature_pass_date: ""

			departure_date: "2023-11-01"

			cost_shipping_fee: "5000"

			cost_other_note: "A text is any stretch of language that can be understood in context. It may be as simple as 1-2 words (such as a stop sign) or as complex as a novel."

			cost_deposit: "480"

			cost_daily_wages: "7800"

			cost_crew_note: "Traditionally, a text is understood to be a piece of written or spoken material in its primary form (as opposed to a paraphrase or summary)."

			cost_additional_fee: "4500"

			arrived_time: "15:40"

			arrived_pass_time: "09:45"

			arrived_pass_date: "2023-11-11"

			arrived_date: "2023-11-08"

			departure_areas: "[{\"area_id\":\"6d6ae6df-67ae-4d80-a86e-15b9b1f49781\",\"area_in_date\":\"2023-11-01\",\"area_in_time\":\"18:00\",\"area_out_date\":\"2023-11-03\",\"area_out_time\":\"19:30\",\"area_note\":\"We turn insights and data into ideas that transform some of the top brands in the world.\",\"loads\":[{\"load_arrived_date\":\"2023-11-01\",\"load_arrived_time\":\"20:30\",\"load_from_date\":\"2023-11-01\",\"load_from_time\":\"21:30\",\"load_to_date\":\"2023-11-02\",\"load_to_time\":\"03:30\",\"load_checked\":true,\"load_checked_date\":\"2023-11-01\",\"load_weight\":\"1500\",\"load_port\":\"BuJang\",\"load_note\":\"Text abbreviations are shortened versions of a word or phrase used.\"}],\"unloads\":[{\"unload_arrived_date\":\"2023-11-02\",\"unload_arrived_time\":\"05:30\",\"unload_from_date\":\"2023-11-02\",\"unload_from_time\":\"07:40\",\"unload_to_date\":\"2023-11-02\",\"unload_to_time\":\"10:30\",\"unload_weight\":\"550\",\"unload_port\":\"SuJang\",\"unload_note\":\"The abbreviations and acronyms are used to save time, avoid typing and ensure a social media post stays within a certain character limit.\"}],\"area\":{\"id\":\"6d6ae6df-67ae-4d80-a86e-15b9b1f49781\",\"name\":\"Estuary\",\"note\":\"This is Estuary.\"}},{\"area_id\":\"2b7cc207-4a03-4614-83db-9fb8f9e9b6a7\",\"area_in_date\":\"2023-11-03\",\"area_in_time\":\"15:35\",\"area_out_date\":\"2023-11-05\",\"area_out_time\":\"09:00\",\"area_note\":\"Every Android phone has Google applications, including the Messages app.\",\"loads\":[],\"unloads\":[],\"area\":{\"id\":\"2b7cc207-4a03-4614-83db-9fb8f9e9b6a7\",\"name\":\"Arabian Sea\",\"note\":\"This is Arabian Sea.\"}}]"

			navigation_areas: "[{\"area_id\":\"503f639a-4764-41d7-9a61-66af5aae32b8\",\"area_in_date\":\"2023-11-06\",\"area_in_time\":\"15:40\",\"area_out_date\":\"2023-11-08\",\"area_out_time\":\"07:35\",\"area_note\":\"The Messages app provides users with sent and received message history.\",\"loads\":[],\"unloads\":[],\"area\":{\"id\":\"503f639a-4764-41d7-9a61-66af5aae32b8\",\"name\":\"Beafort Sea\",\"note\":\"This is Beafort Sea.\"}}]"

			arrived_areas: "[{\"area_id\":\"89ff9119-e446-4124-8031-068a2deb3b0d\",\"area_in_date\":\"2023-11-09\",\"area_in_time\":\"15:40\",\"area_out_date\":\"2023-11-10\",\"area_out_time\":\"15:40\",\"area_note\":\"The meaning of TEXT is the original words and form of a written or printed work.\",\"loads\":[],\"unloads\":[{\"unload_arrived_date\":\"2023-11-09\",\"unload_arrived_time\":\"18:40\",\"unload_from_date\":\"2023-11-09\",\"unload_from_time\":\"21:45\",\"unload_to_date\":\"2023-11-10\",\"unload_to_time\":\"06:40\",\"unload_weight\":\"2000\",\"unload_port\":\"BanJang\",\"unload_note\":\"How to use text in a sentence.\"}],\"area\":{\"id\":\"89ff9119-e446-4124-8031-068a2deb3b0d\",\"name\":\"Bay\",\"note\":\"This is Bay.\"}}]"

			cost_crews: "[{\"id\":\"c05d35ba-7be0-4b63-aea4-f07597be76e5\",\"mariner_daily_fee\":26,\"mariner_days\":0},{\"id\":\"e83b3e0a-7db9-4cbc-a21c-342892e2cd42\",\"mariner_daily_fee\":49,\"mariner_days\":0},{\"id\":\"49650d75-a99b-4729-bf1e-438d36d6f94a\",\"mariner_daily_fee\":45,\"mariner_days\":0},{\"id\":\"d1a4078d-db8b-43aa-b2b8-394a51f16a15\",\"mariner_daily_fee\":39,\"mariner_days\":0},{\"id\":\"b1715e19-e5a4-4b7d-83c8-3fa4ddb250cc\",\"mariner_daily_fee\":42,\"mariner_days\":0},{\"id\":\"f0db14a3-6ff3-454a-be76-726011627fde\",\"mariner_daily_fee\":31,\"mariner_days\":0},{\"id\":\"bb8f8b69-9839-4c61-b72c-223c65f7d765\",\"mariner_daily_fee\":41,\"mariner_days\":0},{\"id\":\"ee283e2a-f69a-48ef-b72e-a4ddd47dc91e\",\"mariner_daily_fee\":37,\"mariner_days\":0},{\"id\":\"c4651608-5900-4cab-9d2b-de9589863e97\",\"mariner_daily_fee\":26,\"mariner_days\":0},{\"id\":\"eb75b8af-f7e6-4e6d-a970-e6dd4e98eb59\",\"mariner_daily_fee\":23,\"mariner_days\":0},{\"id\":\"474a1fda-85a5-4a3f-a3a2-f03441e21a25\",\"mariner_daily_fee\":29,\"mariner_days\":0},{\"id\":\"93e4f384-dba9-4715-b1cc-f97cf8ec927b\",\"mariner_daily_fee\":32,\"mariner_days\":0},{\"id\":\"6eca3789-325d-424b-a087-5078c61b989e\",\"mariner_daily_fee\":26,\"mariner_days\":0},{\"id\":\"7fbe56f2-2a78-4606-ab2a-7b1c6fab67d6\",\"mariner_daily_fee\":50,\"mariner_days\":0},{\"id\":\"d0797632-3fda-48eb-a8a3-193c2dd48384\",\"mariner_daily_fee\":35,\"mariner_days\":0},{\"id\":\"faa0650d-f310-44ce-ab4d-fe6d9dcc0123\",\"mariner_daily_fee\":20,\"mariner_days\":0},{\"id\":\"32ceb57e-ec7b-43eb-924a-f731f89b6e3e\",\"mariner_daily_fee\":26,\"mariner_days\":0}]"

			cost_others: "[{\"id\":1,\"item\":\"Coffee\",\"price\":\"1500\",\"from\":\"2023-11-01\",\"to\":\"2023-11-11\",\"amount\":15000},{\"id\":2,\"item\":\"Cigratte\",\"price\":\"300\",\"from\":\"2023-11-01\",\"to\":\"2023-11-11\",\"amount\":3000}]"
		}
	) {
		shippings {
		 	id
		}
	}
}