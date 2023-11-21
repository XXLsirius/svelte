<script>
	import Card from "../../../components/card/Card.svelte";
	import { currentItemStore, forRefreshStore } from "../../../stores";
	import MarinerModel from "../../../../assets/js/models/MarinerModel";
	import { goto } from "$app/navigation";
	import DataTable from "../../../components/table/DataTable.svelte";
	import ModelFuncs from "../../../../assets/js/models/ModelMain";
	import { page } from "$app/stores";

	let currentItem = {};

	if ($page.params.id) {
		MarinerModel.getAll({
			pagination: { page: 1, perPage: 1 },
			filter: { id: $page.params.id },
		}).then((res) => {
			currentItem = res.data[0];
		});
	} else {
		currentItem = {};
	}
</script>

<Card hasHeader="false">
	<div class="row">
		<div class="col-md-4">
			<img
				alt="mariner"
				class="w-100"
				src={currentItem.image
					? `${ModelFuncs.getServerUrl()}/${currentItem.image}`
					: "/src/assets/images/mariners/placeholder.png"}
			/>
		</div>

		<div class="col-md-8">
			<div class="row">
				<div class="col-md-6">
					<h2>{currentItem.name ?? ""}</h2>
					<h6>Birthday: <span>{currentItem.birthday ?? ""}</span></h6>
					<h6>
						Ship: <span
							>{currentItem.ship ? currentItem.ship.vesselName : ""}</span
						>
					</h6>
					<h6>
						Duty: <span>{currentItem.duty ? currentItem.duty.name : ""}</span>
					</h6>
					<h6>
						Registered: <span>{currentItem.registered ?? ""}</span>
					</h6>
					<h6>
						Retired: <span
							>{currentItem.removed ? currentItem.removed : "-"}</span
						>
					</h6>
				</div>

				<div class="col-md-6 text-right">
					<button
						type="button"
						class="btn btn-warning mb-3 mr-3"
						style="width: 100px;"
						on:click={() =>
							goto(`/mariner/mariner-create/id=${currentItem.id}`)}>Edit</button
					>
					<a href="/mariner"
						><button
							type="button"
							class="btn-transition btn btn-outline-warning mb-3"
							style="width: 100px;">Back</button
						></a
					>
				</div>

				<div class="col-md-12 mt-3">
					<div>{currentItem.note ?? ""}</div>
				</div>
			</div>
		</div>
	</div>
</Card>

<div class="mb-4" />

<Card title="VESSEL PARTICULARS">
	<div class="row">
		<div class="col-12">
			<DataTable
				data={[
					{
						id: 1,
						key: "Job",
						value: currentItem.job ? currentItem.job.name : "",
					},
					{
						id: 2,
						key: "Daily Fee",
						value: currentItem.dailyFee ?? "",
					},
					{
						id: 3,
						key: "Platoon",
						value: currentItem.platoon ? currentItem.platoon.name : "",
					},
					{
						id: 4,
						key: "Previous Affiliation",
						value: currentItem.previousAffiliation ?? "",
					},
					{
						id: 5,
						key: "Place Of Born",
						value: currentItem.placeOfBorn ?? "",
					},
					{
						id: 6,
						key: "Place of Residence",
						value: currentItem.placeOfResidence ?? "",
					},
					{
						id: 7,
						key: "Code",
						value: currentItem.code ?? "",
					},
					{
						id: 8,
						key: "Mobile Phone",
						value: currentItem.mobilePhone ?? "",
					},
					{
						id: 9,
						key: "Home Phone",
						value: currentItem.homePhone ?? "",
					},
					{
						id: 10,
						key: "Graduated",
						value: currentItem.graduated?.note
							? currentItem.graduated.note
							: "",
					},
					{
						id: 11,
						key: "Qualification Grade",
						value: currentItem.qualificationGrade ?? "",
					},
					{
						id: 12,
						key: "Boarded Years",
						value: currentItem.boardedYears ?? "",
					},
				]}
				hasPagination={false}
			>
				<tr slot="header">
					<th>Item</th>
					<th>Value</th>
				</tr>
				<tr slot="body" let:item={row}>
					<td>{row.key}</td>
					<td>{row.value}</td>
				</tr>
			</DataTable>
		</div>
	</div>
</Card>

<div class="mb-4" />

<Card title="PERSONAL CERTIFICATES">
	<div class="row">
		<div class="col-12">
			<DataTable
				data={currentItem.certificates ? currentItem.certificates : []}
			>
				<tr slot="header">
					<th>Name</th>
					<th>Number</th>
					<th>Issue</th>
					<th>Expire</th>
				</tr>
				<tr slot="body" let:item={row} let:i>
					<td>{row.certificateType ? row.certificateType.name : ""}</td>
					<td>{row.issue ? row.issue.id : ""}</td>
					<td>{row.issue ? row.issue.issue : ""}</td>
					<td>{row.issue ? row.issue.expire : ""}</td>
				</tr>
			</DataTable>
		</div>
	</div>
</Card>
