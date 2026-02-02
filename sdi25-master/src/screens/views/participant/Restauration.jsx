import {
  handleServiceCommand,
  handleServiceParticipantGetData,
} from "../../../services/restaurantService.tsx";
import Button from "../../../components/ui/ButtonUi.tsx";
import SelectUi from "../../../components/ui/SelectUi.tsx";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function Restauration() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [data, setData] = useState({});

  const [listCollation, setListCollation] = useState([]);
  const [collationValue, setCollationValue] = useState([]);
  const handleCollationChange = (selectedOption) => {
    setCollationValue(selectedOption.value);
  };

  const handleCommand = async () => {
    setIsLoading(true);
    const data = {
      collationId: collationValue,
    };
    await handleServiceCommand(data);
    await getData();
    setIsLoading(false);
  };

  async function getData() {
    setIsLoading(true);

    const result = await handleServiceParticipantGetData();
    if (result.collations) {
      const temp = result.collations.map((item) => ({
        value: item.id,
        label: item.libelle,
      }));
      setListCollation(temp);
    }

    if (result.collation) {
      setOrder(result.collation);
    }

    setData(result);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-w-xl mx-auto md:py-24 py-4 px-4">
      {!isLoading ? (
        <div className="flex flex-col gap-6 items-center w-full">
          <h1 className="font-bold text-xl text-center text-[#F94C10]">
            Votre Code Qr
          </h1>
          <QRCode value={data.qrcodeValue || ""} />
          <h1 className="font-bold text-xl text-center my-6 text-[#F94C10]">
            Commandez une collation
          </h1>
          {!data.hasOrdered ? (
            <div className="w-full">
              <center>
                {listCollation.length !== 0 ? (
                  <SelectUi
                    placeholder="Choisissez"
                    options={listCollation}
                    filterValue={collationValue}
                    onChange={handleCollationChange}
                  />
                ) : null}
                {listCollation.length !== 0 ? (
                  <div className="mt-6">
                    <Button
                      label="Commander"
                      onClick={() => handleCommand()}
                      isDisable={false}
                      isLoading={isLoading}
                      isReady={true}
                    />
                  </div>
                ) : null}
              </center>
            </div>
          ) : (
            <div>Vous avez commandé du {order.libelle}</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
