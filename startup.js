
window.onload = function()
{
    //createTable2();
    currentTime();
}

function createTable2()
{
    const currentDate = new Date();
    const anchorOff = 0
    const anchorDate = new Date(2022, 6, 3, 0, 0, 0, 0);
    const weekDifference = (currentDate.getTime() - anchorDate.getTime())/(1000*3600*24*7);
    const weekOff = Math.floor((weekDifference + anchorOff) % 7);

    const elements = Elements.GetElements();
    const headings = Elements.GetHeadings();
    const properties = Elements.GetProperties();

    // create table
    const table = document.createElement("table");

    // create row for headings...
    const hrow = document.createElement("tr");
    table.appendChild(hrow);

    // ...and add cells to it
    for(let heading of headings)
    {
        const th = document.createElement("th");
        const thtext = document.createTextNode(heading);
        th.appendChild(thtext);
        hrow.appendChild(th);
        if(((currentDate.getDay() !== 6) && (currentDate.getDay() !== 0)) && (heading == (headings[currentDate.getDay()]))) 
        {
            th.classList.add("active")
        }
    }

    // iterate data, adding rows and cells for each item
    for(let element of elements)
    {
        if(element.week !== weekOff)
        {
            if(element.week !== weekOff + 7 )
            {
                const drow = document.createElement("tr");
                table.appendChild(drow);

                for(let property of properties)
                {
                    const td = document.createElement("td");
                    const tdtext = document.createTextNode(element[property]);
                    td.appendChild(tdtext);
                    drow.appendChild(td);
                    if(((currentDate.getDay() !== 6) && (currentDate.getDay() !== 0)) && (property == (properties[currentDate.getDay()]))) 
                    {
                        td.classList.add("active")
                    }
                }
            }
        }
    }

    // add table to div
    document.getElementById("table").appendChild(table);
}


function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
  
    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
      
    let time = hh + ":" + mm;
  
    document.getElementById("clock").innerText = time; 
    var t = setTimeout(function(){ currentTime() }, 1000); 
  
  }
