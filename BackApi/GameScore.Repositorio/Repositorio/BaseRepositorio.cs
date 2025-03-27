using DataAccess.Contexto;

public abstract class BaseRepositorio
{
    protected readonly GameScoreContexto _contexto;

    protected BaseRepositorio (GameScoreContexto contexto){
        _contexto = contexto;
    }
}