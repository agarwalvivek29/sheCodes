import { useSelector, useDispatch } from "react-redux"
import { backendUrl } from "../App"
import { dataActions } from "../store/data-slice";
import { useNavigate } from "react-router-dom";

export default function Tokens(){

    const contracts = useSelector((state)=>state.data.contracts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getContracts = async()=>{
        try{
            const response = await fetch(`${backendUrl}/contract/getAll`);
            const data = await response.json();
            console.log('data:', data);
            if(data.success){
                dispatch(dataActions.setContracts(data.contracts));
            }
        }
        catch(err){
            console.log('error:', err);
        }
    }

    const handleRouting = (address)=>{
        console.log('address:', address);
        navigate(`/token/${address}`);
    };

    return (
        <>
        {contracts.length !== 0 && <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden my-4">
            <thead className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
                <tr>
                    <th className="py-3 px-6 text-left">Project / Institution</th>
                    <th className="py-3 px-6 text-left">Symbol</th>
                    <th className="py-3 px-6 text-left">Initial Supply</th>
                    <th className="py-3 px-6 text-left">Sale Price (ETH)</th>
                    <th className="py-3 px-6 text-left">Available Tokens</th>
                    <th className="py-3 px-6 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                {contracts.map((contract,index)=>{
                    return (
                        <tr className="border-b border-gray-200 hover:bg-gray-50" key={index}>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{contract.name}</td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{contract.symbol}</td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{contract.initialSupply}</td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{contract.salePrice}</td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{contract.availableTokens}</td>
                            <td className="py-3 px-6 text-center">
                                <button onClick={()=>{
                                    handleRouting(contract.address)
                                }} className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full">
                                    Buy
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>}
        {
            contracts.length === 0 && <button onClick={getContracts}>
                getData
            </button>
        }
        </>

    )
}