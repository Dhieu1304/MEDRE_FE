import React, { useState, useEffect } from "react";
import { useFetchingStore } from "../../../store/FetchingApiStore";
import patientServices from "../../../services/patientServices";

const WithPatientsLoaderWrapper = (WrappedComponent) => {
  function TimesLoaderWrapper(props) {
    const [patients, setPatients] = useState([]);

    const { fetchApi } = useFetchingStore();

    const loadPatients = async () => {
      await fetchApi(async () => {
        const res = await patientServices.getPatients();

        if (res.success) {
          const patientsData = res?.patients;
          setPatients([...patientsData]);
          return { ...res };
        }
        setPatients([]);
        return { ...res };
      });
    };

    useEffect(() => {
      loadPatients();
    }, []);

    return <WrappedComponent patients={patients} {...props} />;
  }

  return TimesLoaderWrapper;
};

export default WithPatientsLoaderWrapper;
