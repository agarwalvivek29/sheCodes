import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
import OneTimeSaleToken from '../assets/OneTimeSaleToken.json';
import { dataActions } from '../store/data-slice';

export default function MyTokens(){

    const walletBalance = useSelector(state => state.data.walletBalance);
    const contracts = useSelector(state => state.data.contracts);

    const dispatch = useDispatch();

    const wrapper = async ()=>{
        let wallet = [];
        for(let i=0;i<contracts.length;i++){
            const contract = contracts[i];
            console.log('contract:', contract);
            const web3 = new Web3(window.ethereum);
            const contractInstance = new web3.eth.Contract(OneTimeSaleToken.abi,contract.address);
            const getTokens = async ()=>{
                const accounts = await web3.eth.getAccounts();
                const balance = await contractInstance.methods.balanceOf(accounts[0]).call();
                console.log('balance:', balance);
                if( balance > 0 ){
                    wallet.unshift({
                        ...contract,
                        balance
                    });
                }
            }
            await getTokens();
        }
        console.log(wallet);
        dispatch(dataActions.setWalletBalance(wallet));
    }

    useEffect(()=>{
        if(walletBalance.length === 0){
            wrapper();
        }
    },[contracts]);

    async function handleRedemption(){};

    return(
        <>
        <div className="text-2xl text-center font-semibold">My Wallet Balance</div>
        {<div>
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden my-4">
            <thead className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
                <tr>
                    <th className="py-3 px-6 text-left">Project / Institution</th>
                    <th className="py-3 px-6 text-left">Symbol</th>
                    <th className="py-3 px-6 text-left">Sale Price (ETH)</th>
                    <th className="py-3 px-6 text-left">My Balance</th>
                    <th className="py-3 px-6 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                {walletBalance.map((contract,index)=>{
                    return (
                        <tr className="border-b border-gray-200 hover:bg-gray-50" key={index}>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{contract.name}</td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{contract.symbol}</td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{parseFloat(contract.salePrice, 4)*84}$</td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">{String(contract.balance)}</td>
                            <td className="py-3 px-6 text-center">
                                <button onClick={handleRedemption} className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-full">
                                    Redeem
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
            </div>}
        {!walletBalance && <div>Loading....</div>}
        </>
    )
}