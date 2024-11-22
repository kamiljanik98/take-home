import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { useStore } from "../store";

export const Entrypoint = () => {
  const visibleCards = useStore((state) => state.visibleCards);
  const deletedCards = useStore((state) => state.deletedCards);
  const deleteCard = useStore((state) => state.deleteCard);
  const restoreCard = useStore((state) => state.restoreCard);
  const toggleCard = useStore((state) => state.toggleCard);


  const setVisibleCards = useStore((state) => state.setVisibleCards);
  // const setDeletedCards = useStore((state) => state.setDeletedCards);



  // const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const listQuery = useGetListData();
  // const [deletedCards, setDeletedCards] = useState<ListItem[]>([]); 
  const [isHidden, setIsHidden] = useState(true); 

  
  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }
    
    setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading]);
  
  const onDeleteCard = (card: ListItem) => {
    deleteCard(card);
  };

  const onRestoreCard = (restoredCard: ListItem) => {
    restoreCard(restoredCard);
  }

  const onToggleCard = (expandedCard: ListItem) => {
    toggleCard(expandedCard);
    console.log(expandedCard);
    
  }

  const onRefresh = () => {
    listQuery.refetch()
  }

  if (listQuery.isLoading || listQuery.isFetching) {
    return <Spinner />;
  }
  
  console.log(visibleCards);
  

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl" >
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h1>
          <button 
            onClick={onRefresh}
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            >
            Refresh
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card key={card.id} title={card.title} description={card.description} onExpandClick={() => onToggleCard(card)} onCloseClick={() => onDeleteCard(card)} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards ({deletedCards.length})</h1>
          <button
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            onClick={() => setIsHidden(!isHidden)}
          >
            {isHidden ? "Reveal" : "Hide"}
          </button>
        </div>
        {isHidden ? null : (
        <div className="flex flex-col gap-y-3">
          {deletedCards.map((card) => (
            <Card key={card.id} title={card.title} onCloseClick={() => onRestoreCard(card)}/>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};
