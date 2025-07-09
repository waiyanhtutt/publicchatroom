import { format } from "date-fns";
export function UiElement(divele) {
  const UserinfoEle = (data) => {
    const uid = data.uid;
    const email = data.email;
    const fullname = data.displayName;
    const photourl = data.photoURL;
    const createdtime = data.metadata.creationTime;

    // const getdate = new Date(createdtime).getDate();
    // const months = [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "April",
    //   "May",
    //   "Jun",
    //   "July",
    //   "Aug",
    //   "Sept",
    //   "Oct",
    //   "Nov",
    //   "Dec",
    // ];
    // const getmonth = new Date(createdtime).getMonth();
    // const getyear = new Date(createdtime).getFullYear();

    // const formatdate = `${getdate} ${months[getmonth]} ${getyear}`;

    const formatdate = format(new Date(createdtime), "do MMM yyyy");
    // console.log(formatdate);

    const html = `
            <img src="${photourl}" alt="profile icon" width="80">
            <p>UID : ${uid}</p>
            <p>Display Name : ${fullname}</p>
            <p>Email : ${email}</p>
            <p>Created at : ${formatdate}</p>
        `;

    divele.innerHTML = html;
  };

  return { UserinfoEle };
}
