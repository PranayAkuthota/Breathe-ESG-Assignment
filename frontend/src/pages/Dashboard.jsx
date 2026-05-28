import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard() {

const [stats, setStats] = useState({})
const [records, setRecords] = useState([])
const [file, setFile] = useState(null)
const [category, setCategory] = useState("Fuel")
const [msg, setMsg] = useState("")
const [search, setSearch] = useState("")



useEffect(() => {

loadStats()
loadRecords()

}, [category])



const loadStats = async () => {

const res = await axios.get(
"http://127.0.0.1:8000/api/stats/"
)

setStats(res.data)

}



const loadRecords = async (status = null) => {

let url = "http://127.0.0.1:8000/api/records/"

const params = []

if (status) {

params.push(`status=${status}`)

}

if (category) {

params.push(`category=${category}`)

}

if (params.length > 0) {

url += "?" + params.join("&")

}

const res = await axios.get(url)

setRecords(res.data)

}



const approveRecord = async (id) => {

await axios.post(
`http://127.0.0.1:8000/api/approve/${id}/`
)

loadStats()
loadRecords()

}



const uploadFile = async () => {

if (!file) return

const formData = new FormData()

formData.append(
"file",
file
)

formData.append(
"category",
category
)

await axios.post(
"http://127.0.0.1:8000/api/upload/",
formData
)

setMsg("CSV uploaded successfully")

loadStats()
loadRecords()

}



return (

<div
style={{
  minHeight: "100vh",
  width: "100%",
  background: "#020b26",
  color: "white",
  padding: "40px",
  fontFamily: "Arial"
}}
>
{/* TITLE */}

<h1
style={{
textAlign: "center",
fontSize: "58px",
marginBottom: "10px"
}}
>
ESG Sustainability Dashboard
</h1>

<p
style={{
textAlign: "center",
color: "gray",
marginTop:"40px",
marginBottom: "40px"
}}
>
 Data review system
</p>



{/* CARDS */}

<div
style={{
display: "flex",
gap: "20px",
marginBottom: "40px"
}}
>

<div style={card}>

<p>Total</p>

<h2>
{stats.total_records}
</h2>

</div>



<div style={card}>

<p>Flagged</p>

<h2>
{stats.flagged}
</h2>

</div>



<div style={card}>

<p>Approved</p>

<h2>
{stats.approved}
</h2>

</div>



<div style={card}>

<p>Risk</p>

<h2>
{stats.risk_percent}%
</h2>

</div>

</div>



{/* CONTROLS */}

<div
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "20px",
flexWrap: "wrap",
gap: "15px"
}}
>

<div
style={{
display: "flex",
gap: "10px",
alignItems: "center"
}}
>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
style={inputStyle}
>

<option>Fuel</option>
<option>Electricity</option>
<option>Travel</option>

</select>



<input
type="file"
onChange={(e)=>setFile(e.target.files[0])}
/>



<button
onClick={uploadFile}
style={buttonStyle}
>

Upload CSV

</button>

</div>



<input
placeholder="Search"

value={search}

onChange={(e)=>setSearch(e.target.value)}

style={{
...inputStyle,
width: "320px",
marginRight:"150px"
}}
/>

</div>



{/* MESSAGE */}

{
msg &&

<p
style={{
color: "lightgreen",
marginBottom: "20px"
}}
>

{msg}

</p>

}



{/* FILTERS */}

<div
style={{
display: "flex",
gap: "10px",
marginBottom: "20px"
}}
>

<button
style={buttonStyle}
onClick={()=>loadRecords()}
>

All

</button>



<button
style={buttonStyle}
onClick={()=>loadRecords("FLAGGED")}
>

Flagged

</button>



<button
style={buttonStyle}
onClick={()=>loadRecords("LOCKED")}
>

Approved

</button>

</div>



{/* TABLE */}

<div
style={{
border: "1px solid #374151",
borderRadius: "10px",
overflow: "hidden"
}}
>

<table
style={{
width: "100%",
borderCollapse: "collapse",
background: "#111827"
}}
>

<thead
style={{
background: "#1f2937"
}}
>

<tr>

<th style={{width:"6%"}}>ID</th>

<th style={{width:"12%"}}>Category</th>

<th style={{width:"18%"}}>Name</th>

<th style={{width:"12%"}}>Quantity</th>

<th style={{width:"10%"}}>Unit</th>

<th style={{width:"14%"}}>Created</th>

<th style={{width:"14%"}}>Status</th>

<th style={{width:"14%"}}>Suspicious</th>

<th style={{width:"10%"}}>Action</th>

</tr>

</thead>

<tbody>

{
records

.filter((item) => {

const text = JSON.stringify(
item.normalized_data || {}
).toLowerCase()

const matchesSearch = text.includes(
search.toLowerCase()
)

const hasAnyData = Object.values(
item.normalized_data || {}
).some(
(value) =>
value !== null &&
value !== "" &&
value !== "N/A"
)

return matchesSearch && hasAnyData

})

.map((item) => (
<tr
key={item.id}
style={{
borderBottom: "1px solid #374151"
}}
>

<td style={tableCell}>
{item.id}
</td>



<td style={tableCell}>
{item.category}
</td>



<td>
{
item.normalized_data?.fuel ||

item.normalized_data?.source ||

item.normalized_data?.employee ||

item.normalized_data?.mode ||

"-"
}
</td>

<td>
{
item.normalized_data?.quantity ||

item.normalized_data?.usage ||

item.normalized_data?.distance ||

"-"
}
</td>



<td style={tableCell}>
{item.normalized_data?.unit || "-"}
</td>



<td style={tableCell}>

{
new Date(item.created_at)
.toLocaleDateString()
}

</td>



<td style={tableCell}>

<span
style={{

padding:"5px 10px",

borderRadius:"6px",

background:

item.status==="LOCKED"
? "green"

:

item.status==="FLAGGED"
? "red"

:

"orange",

color:"white"

}}
>

{item.status}

</span>

</td>



<td
style={{
...tableCell,
color:
item.suspicious
? "red"
: "lightgreen",
fontWeight: "bold"
}}
>

{
item.suspicious
? "FLAGGED"
: "OK"
}

</td>



<td style={tableCell}>

{
item.status !== "LOCKED"
&&

<button
onClick={()=>approveRecord(item.id)}
style={approveButton}
>

Approve

</button>

}

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

)

}




/* CARD */

const card = {

flex:1,

padding:"20px",

border:"1px solid gray",

borderRadius:"10px",

background:"#111827",

textAlign:"center"

}

const tableHeader = {

    padding: "18px 24px",
    
    textAlign: "left",
    
    fontWeight: "bold",
    
    fontSize: "18px"
    
    }


/* INPUT */

const inputStyle = {

padding: "10px",

borderRadius: "6px",

border: "1px solid #374151",

background: "#1f2937",

color: "white"

}



/* BUTTON */

const buttonStyle = {

padding: "10px 16px",

border: "none",

borderRadius: "6px",

background: "#2563eb",

color: "white",

cursor: "pointer"

}



/* APPROVE BUTTON */

const approveButton = {

padding:"6px 12px",

border:"none",

borderRadius:"4px",

background:"#d1d5db",

color:"black",

cursor:"pointer"

}



/* TABLE HEAD */

const tableHead = {

padding: "14px",

textAlign: "left"

}



/* TABLE CELL */

const tableCell = {

padding: "14px"

}



export default Dashboard
